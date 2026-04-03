import { ExternalServiceError } from "../errors.js";
import {
  userTweetsResponseSchema,
  tweetsByIdsResponseSchema,
  type Tweet,
  type Account,
} from "./twitter.schemas.js";

// === TwitterClient ===
// Industrial-grade client for twitterapi.io with retry, rate-limit awareness,
// and parallel batch fetching. Matches the 3-layer pattern from twitter-data-pipeline.

const API_BASE = "https://api.twitterapi.io";
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_RETRIES = 3;
const RETRY_BASE_MS = 1_000;
const MAX_CONCURRENT = 3;

export interface TwitterClientOptions {
  apiKey: string;
  maxRetries?: number;
  timeoutMs?: number;
}

export class TwitterClient {
  private readonly apiKey: string;
  private readonly maxRetries: number;
  private readonly timeoutMs: number;

  constructor(opts: TwitterClientOptions) {
    this.apiKey = opts.apiKey;
    this.maxRetries = opts.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  }

  /** Fetch one or more tweets by ID. Uses GET /twitter/tweets?tweet_ids=... (~300 credits/tweet) */
  async fetchTweetsByIds(ids: string[]): Promise<Tweet[]> {
    if (ids.length === 0) return [];
    const url = `${API_BASE}/twitter/tweets?tweet_ids=${ids.join(",")}`;
    const raw = await this._fetch(url);
    const parsed = tweetsByIdsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new ExternalServiceError("twitterapi.io", `Invalid response for tweet IDs: ${parsed.error.message}`);
    }
    return parsed.data.tweets as Tweet[];
  }

  /** Fetch latest tweets for a user. Uses GET /twitter/user/last_tweets (~300 credits/call, 20/page) */
  async fetchUserTweets(
    username: string,
    cursor?: string,
  ): Promise<{ tweets: Tweet[]; nextCursor?: string }> {
    const params = new URLSearchParams({ userName: username });
    if (cursor) params.set("cursor", cursor);
    const url = `${API_BASE}/twitter/user/last_tweets?${params}`;
    const raw = await this._fetch(url);
    const parsed = userTweetsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      throw new ExternalServiceError("twitterapi.io", `Invalid response for @${username}: ${parsed.error.message}`);
    }
    return {
      tweets: parsed.data.data.tweets as Tweet[],
      nextCursor: parsed.data.has_next_page ? parsed.data.next_cursor : undefined,
    };
  }

  /** Parse a tweet URL and fetch by ID. Accepts x.com or twitter.com URLs. */
  async fetchTweetByUrl(url: string): Promise<Tweet> {
    const match = url.match(/(?:x\.com|twitter\.com)\/\w+\/status\/(\d+)/);
    if (!match?.[1]) {
      throw new ExternalServiceError("twitterapi.io", `Cannot parse tweet URL: ${url}`);
    }
    const tweets = await this.fetchTweetsByIds([match[1]]);
    if (tweets.length === 0) {
      throw new ExternalServiceError("twitterapi.io", `Tweet not found: ${match[1]}`);
    }
    const tweet = tweets[0];
    if (!tweet) {
      throw new ExternalServiceError("twitterapi.io", `Tweet not found for URL: ${url}`);
    }
    return tweet;
  }

  /** Fetch multiple accounts in parallel with concurrency limit. */
  async fetchMultipleAccounts(
    accounts: Account[],
  ): Promise<Map<string, Tweet[]>> {
    const results = new Map<string, Tweet[]>();
    // Process in batches of MAX_CONCURRENT
    for (let i = 0; i < accounts.length; i += MAX_CONCURRENT) {
      const batch = accounts.slice(i, i + MAX_CONCURRENT);
      const settled = await Promise.allSettled(
        batch.map(async (acc) => {
          const { tweets } = await this.fetchUserTweets(acc.username);
          return { username: acc.username, tweets };
        }),
      );
      for (const result of settled) {
        if (result.status === "fulfilled") {
          results.set(result.value.username, result.value.tweets);
        } else {
          console.error(`[twitter] Failed to fetch account: ${result.reason}`);
          // Graceful degradation — continue with other accounts
        }
      }
    }
    return results;
  }

  /** Extract video info from a tweet. Prefers 832k (360p) for speed. */
  static extractVideoInfo(
    tweet: Tweet,
  ): { videoUrl: string; durationSec: number } | null {
    const sources = [
      tweet.extendedEntities,
      tweet.quoted_tweet?.extendedEntities,
    ];
    for (const ext of sources) {
      if (!ext?.media) continue;
      for (const m of ext.media) {
        if (m.type !== "video" || !m.video_info) continue;
        const durationSec = Math.floor(m.video_info.duration_millis / 1000);
        const mp4s = m.video_info.variants.filter(
          (v) => v.content_type === "video/mp4",
        );
        if (mp4s.length === 0) continue;
        // Prefer 360p (832k bitrate) for fast downloads
        const target = mp4s.find((v) => v.bitrate === 832000);
        const best =
          target ??
          mp4s.reduce((a, b) =>
            (a.bitrate ?? Infinity) < (b.bitrate ?? Infinity) ? a : b,
          );
        return { videoUrl: best.url, durationSec };
      }
    }
    return null;
  }

  /** Internal fetch with exponential backoff and rate-limit awareness. */
  private async _fetch(url: string): Promise<unknown> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const res = await fetch(url, {
          headers: { "x-api-key": this.apiKey },
          signal: controller.signal,
        });

        if (res.status === 429) {
          const retryAfter = Number(res.headers.get("retry-after")) || 0;
          const delay = Math.max(
            retryAfter * 1000,
            RETRY_BASE_MS * 2 ** attempt,
          );
          console.warn(
            `[twitter] 429 rate-limited, waiting ${delay}ms (attempt ${attempt + 1}/${this.maxRetries + 1})`,
          );
          await sleep(delay);
          continue;
        }

        if (!res.ok) {
          throw new ExternalServiceError(
            "twitterapi.io",
            `HTTP ${res.status}: ${await res.text().catch(() => "unknown")}`,
          );
        }

        return await res.json();
      } catch (err) {
        lastError =
          err instanceof Error ? err : new Error(String(err));

        if (err instanceof ExternalServiceError) throw err;

        // Retry on network/timeout errors
        if (attempt < this.maxRetries) {
          const delay = RETRY_BASE_MS * 2 ** attempt;
          console.warn(
            `[twitter] Request failed, retrying in ${delay}ms: ${lastError.message}`,
          );
          await sleep(delay);
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    throw new ExternalServiceError(
      "twitterapi.io",
      `Failed after ${this.maxRetries + 1} attempts: ${lastError?.message}`,
    );
  }
}

// === LlmsTxtFormatter ===
// Output formatters following the llms.txt spec (H1/blockquote/H2/Optional).
// Optimized for LLM consumption at scale.

function toLlmsTxt(data: {
  date: string;
  accounts: Map<string, Tweet[]>;
  transcriptsDir?: string;
}): string {
  const totalTweets = [...data.accounts.values()].reduce(
    (sum, t) => sum + t.length,
    0,
  );
  const fetchedAt = new Date().toISOString();
  const accountNames = [...data.accounts.keys()];

  const lines: string[] = [
    `# Twitter Intel — ${data.date}`,
    "",
    `> Daily intelligence feed from ${accountNames.length} monitored X/Twitter accounts.`,
    `> Source: twitterapi.io | Accounts: ${accountNames.length} | Tweets: ${totalTweets} | Fetched: ${fetchedAt}`,
    "",
  ];

  for (const [username, tweets] of data.accounts) {
    lines.push(`## @${username}`, "");
    if (tweets.length === 0) {
      lines.push("No recent tweets found.", "");
      continue;
    }
    for (const t of tweets) {
      const text = t.text.replace(/\n/g, "\n  ");
      lines.push(
        `- [${t.createdAt}](${t.url}): ${text}`,
        `  Likes: ${formatCount(t.likeCount)} | RT: ${formatCount(t.retweetCount)} | Views: ${formatCount(t.viewCount)} | Replies: ${formatCount(t.replyCount)}`,
      );
      if (t.isReply && t.inReplyToUsername) {
        lines.push(`  Reply to: @${t.inReplyToUsername}`);
      }
      const video = TwitterClient.extractVideoInfo(t);
      if (video) {
        const mins = Math.floor(video.durationSec / 60);
        const secs = video.durationSec % 60;
        lines.push(
          `  Video: ${mins}m${secs}s → [transcript](transcripts/${t.id}.md)`,
        );
      }
      lines.push("");
    }
  }

  lines.push(
    "## Optional",
    "",
    `- [Video transcripts](${data.transcriptsDir ?? "transcripts/"}) — Whisper-transcribed video content from detected media`,
    `- [Structured JSON](${data.date}.json) — Machine-parseable format with full metadata envelope`,
    `- [Account registry](accounts.json) — Add/remove monitored accounts`,
    "",
  );

  return lines.join("\n");
}

function toJson(data: {
  date: string;
  accounts: Map<string, Tweet[]>;
}): object {
  const accountEntries: Record<string, { tweets: Tweet[] }> = {};
  let totalTweets = 0;
  for (const [username, tweets] of data.accounts) {
    accountEntries[username] = { tweets };
    totalTweets += tweets.length;
  }
  return {
    meta: {
      fetchedAt: new Date().toISOString(),
      source: "twitterapi.io",
      date: data.date,
      accountCount: data.accounts.size,
      tweetCount: totalTweets,
    },
    accounts: accountEntries,
  };
}

function toCompactContext(tweets: Tweet[]): string {
  return tweets
    .map((t) => {
      const text = t.text.replace(/\n/g, " ").slice(0, 280);
      const author = t.author?.userName ?? "unknown";
      return `@${author} [${t.createdAt}] ${text} | ${formatCount(t.likeCount)}L ${formatCount(t.retweetCount)}RT ${formatCount(t.viewCount)}V`;
    })
    .join("\n");
}

function toVideoQueue(tweets: Tweet[]): string {
  const lines: string[] = [];
  for (const t of tweets) {
    const video = TwitterClient.extractVideoInfo(t);
    if (video) {
      lines.push(`VIDEO|${t.id}|${video.videoUrl}|${video.durationSec}`);
    }
  }
  return lines.join("\n");
}

export const LlmsTxtFormatter = { toLlmsTxt, toJson, toCompactContext, toVideoQueue };

// === Helpers ===

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}
