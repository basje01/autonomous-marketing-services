/**
 * sync-intel-package.ts
 *
 * Reads intel/intel-package.json and registers any missing sources in Intel Hub.
 * Idempotent — safe to run repeatedly.
 *
 * Usage: INTEL_API_KEY=xxx pnpm sync-intel
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const INTEL_HUB = "https://intel.lemuriaos.ai";
const API_KEY = process.env.INTEL_API_KEY;

if (!API_KEY) {
  console.error("ERROR: INTEL_API_KEY environment variable is required");
  process.exit(1);
}

interface RequiredSource {
  id: string;
  name: string;
  type: string;
  url: string;
  category: string;
  pollIntervalMinutes: number;
}

interface IntelPackage {
  package: { name: string; version: number };
  feed: { categories: string[]; limit: number; sort: string };
  required_sources: RequiredSource[];
  transcripts: { minDurationSec: number; maxRetryDays: number };
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const packagePath = fileURLToPath(
  new URL("../../../intel/intel-package.json", import.meta.url),
);
const pkg: IntelPackage = JSON.parse(readFileSync(packagePath, "utf-8"));

console.log(`Intel Package: ${pkg.package.name} v${pkg.package.version}`);
console.log(`Required sources: ${pkg.required_sources.length}`);
console.log();

// Fetch existing sources from Intel Hub
const sourcesRes = await fetch(`${INTEL_HUB}/api/intel/sources`, { headers });
if (!sourcesRes.ok) {
  console.error(`ERROR: Failed to fetch sources: ${sourcesRes.status} ${sourcesRes.statusText}`);
  process.exit(1);
}

const sourcesData = (await sourcesRes.json()) as { ok: boolean; items: { id: string }[] };
const existingIds = new Set((sourcesData.items ?? []).map((s) => s.id));

let created = 0;
let skipped = 0;

for (const source of pkg.required_sources) {
  if (existingIds.has(source.id)) {
    console.log(`  SKIP  ${source.id} — already exists`);
    skipped++;
    continue;
  }

  // Validate the atom feed URL before registering
  try {
    const probe = await fetch(source.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(10_000),
    });
    if (!probe.ok) {
      console.warn(`  WARN  ${source.id} — feed URL returned ${probe.status}: ${source.url}`);
      console.warn(`         Registering anyway (Intel Hub will retry on next poll)`);
    }
  } catch {
    console.warn(`  WARN  ${source.id} — could not reach feed URL: ${source.url}`);
    console.warn(`         Registering anyway (Intel Hub will retry on next poll)`);
  }

  const createRes = await fetch(`${INTEL_HUB}/api/intel/sources`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      id: source.id,
      name: source.name,
      type: source.type,
      url: source.url,
      category: source.category,
      pollIntervalMinutes: source.pollIntervalMinutes,
    }),
  });

  if (createRes.ok) {
    console.log(`  NEW   ${source.id} — registered`);
    created++;
  } else {
    const err = await createRes.text();
    console.error(`  FAIL  ${source.id} — ${createRes.status}: ${err}`);
  }
}

console.log();
console.log(`Done. ${created} created, ${skipped} already existed.`);
