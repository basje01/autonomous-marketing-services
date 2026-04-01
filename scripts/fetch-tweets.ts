#!/usr/bin/env npx tsx
/**
 * fetch-tweets.ts — Industrial-grade Twitter/X fetching CLI
 *
 * Usage:
 *   npx tsx scripts/fetch-tweets.ts daily [--video-queue /tmp/vq.txt]
 *   npx tsx scripts/fetch-tweets.ts tweet <url-or-id>
 *   npx tsx scripts/fetch-tweets.ts account <username>
 *   npx tsx scripts/fetch-tweets.ts scan [--pages 5]
 *
 * Env: TWITTERAPI_IO_KEY (required)
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve project root (scripts/ is one level below root)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// Import from gateway service
import { TwitterClient, LlmsTxtFormatter } from "../gateway/src/services/twitter.service.js";
import { accountsFileSchema, type Account } from "../gateway/src/services/twitter.schemas.js";

// --- Config ---

const API_KEY = process.env.TWITTERAPI_IO_KEY;
if (!API_KEY) {
  console.error("Missing TWITTERAPI_IO_KEY env var");
  process.exit(1);
}

const client = new TwitterClient({ apiKey: API_KEY });

// --- Commands ---

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "daily":
    await runDaily();
    break;
  case "tweet":
    await runTweet(args[0]);
    break;
  case "account":
    await runAccount(args[0]);
    break;
  case "scan":
    await runScan();
    break;
  default:
    console.error(`Usage: fetch-tweets.ts <daily|tweet|account|scan> [args]`);
    process.exit(1);
}

// --- daily: fetch all accounts → .md (llms.txt) + .json ---

async function runDaily() {
  const accounts = loadAccounts();
  const date = new Date().toISOString().slice(0, 10);
  const outDir = resolve(ROOT, "intel/twitter");
  mkdirSync(outDir, { recursive: true });

  console.log(`[fetch-tweets] daily run for ${accounts.length} accounts — ${date}`);

  const accountTweets = await client.fetchMultipleAccounts(accounts);

  // Write llms.txt-format markdown
  const md = LlmsTxtFormatter.toLlmsTxt({ date, accounts: accountTweets });
  writeFileSync(resolve(outDir, `${date}.md`), md, "utf-8");

  // Write structured JSON
  const json = LlmsTxtFormatter.toJson({ date, accounts: accountTweets });
  writeFileSync(resolve(outDir, `${date}.json`), JSON.stringify(json, null, 2), "utf-8");

  // Output video queue for bash whisper pipeline
  const videoQueuePath = getFlag("--video-queue");
  const allTweets = [...accountTweets.values()].flat();
  const videoQueue = LlmsTxtFormatter.toVideoQueue(allTweets);

  if (videoQueuePath) {
    writeFileSync(videoQueuePath, videoQueue, "utf-8");
    console.log(`[fetch-tweets] video queue → ${videoQueuePath}`);
  } else if (videoQueue) {
    // Write to stderr so bash can capture
    process.stderr.write(videoQueue + "\n");
  }

  const totalTweets = allTweets.length;
  console.log(`[fetch-tweets] done — ${totalTweets} tweets → ${outDir}/${date}.md + .json`);
}

// --- tweet: fetch single tweet by URL or ID ---

async function runTweet(input?: string) {
  if (!input) {
    console.error("Usage: fetch-tweets.ts tweet <url-or-id>");
    process.exit(1);
  }

  let tweets: import("../gateway/src/services/twitter.schemas.js").Tweet[];

  if (input.includes("x.com") || input.includes("twitter.com")) {
    const tweet = await client.fetchTweetByUrl(input);
    tweets = [tweet];
  } else {
    tweets = await client.fetchTweetsByIds([input]);
  }

  if (tweets.length === 0) {
    console.error(`Tweet not found: ${input}`);
    process.exit(1);
  }

  // Output LLM JSON to stdout
  const json = {
    meta: {
      fetchedAt: new Date().toISOString(),
      source: "twitterapi.io",
      tweetCount: tweets.length,
    },
    tweets,
  };
  console.log(JSON.stringify(json, null, 2));
}

// --- account: fetch latest for one account ---

async function runAccount(username?: string) {
  if (!username) {
    console.error("Usage: fetch-tweets.ts account <username>");
    process.exit(1);
  }

  const { tweets } = await client.fetchUserTweets(username);
  const accounts = new Map([[username, tweets]]);
  const date = new Date().toISOString().slice(0, 10);

  // Output llms.txt format to stdout
  console.log(LlmsTxtFormatter.toLlmsTxt({ date, accounts }));
}

// --- scan: mass scan with pagination ---

async function runScan() {
  const accounts = loadAccounts();
  const maxPages = Number(getFlag("--pages")) || 5;
  const date = new Date().toISOString().slice(0, 10);
  const outDir = resolve(ROOT, "intel/twitter");
  mkdirSync(outDir, { recursive: true });

  console.log(`[fetch-tweets] scan — ${accounts.length} accounts, max ${maxPages} pages each`);

  const accountTweets = new Map<string, import("../gateway/src/services/twitter.schemas.js").Tweet[]>();

  for (const acc of accounts) {
    const allTweets: import("../gateway/src/services/twitter.schemas.js").Tweet[] = [];
    let cursor: string | undefined;

    for (let page = 0; page < maxPages; page++) {
      try {
        const result = await client.fetchUserTweets(acc.username, cursor);
        allTweets.push(...result.tweets);
        if (!result.nextCursor) break;
        cursor = result.nextCursor;
      } catch (err) {
        console.error(`[fetch-tweets] scan error for @${acc.username} page ${page}: ${err}`);
        break;
      }
    }

    accountTweets.set(acc.username, allTweets);
    console.log(`[fetch-tweets] @${acc.username}: ${allTweets.length} tweets`);
  }

  // Write consolidated output
  const md = LlmsTxtFormatter.toLlmsTxt({ date, accounts: accountTweets });
  writeFileSync(resolve(outDir, `${date}-scan.md`), md, "utf-8");

  const json = LlmsTxtFormatter.toJson({ date, accounts: accountTweets });
  writeFileSync(resolve(outDir, `${date}-scan.json`), JSON.stringify(json, null, 2), "utf-8");

  const total = [...accountTweets.values()].reduce((s, t) => s + t.length, 0);
  console.log(`[fetch-tweets] scan complete — ${total} tweets → ${outDir}/${date}-scan.md`);
}

// --- Helpers ---

function loadAccounts(): Account[] {
  const path = resolve(ROOT, "intel/twitter/accounts.json");
  const raw = readFileSync(path, "utf-8");
  const parsed = accountsFileSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    console.error(`Invalid accounts.json: ${parsed.error.message}`);
    process.exit(1);
  }
  return parsed.data.accounts;
}

function getFlag(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  return idx >= 0 ? process.argv[idx + 1] : undefined;
}
