/**
 * sync-intel-package.ts
 *
 * Reads intel packages and registers any missing sources in Intel Hub.
 * Idempotent — safe to run repeatedly.
 *
 * Usage:
 *   INTEL_API_KEY=xxx pnpm sync-intel           # sync all packages
 *   INTEL_API_KEY=xxx pnpm sync-intel -- ops     # sync single package
 *   INTEL_API_KEY=xxx pnpm sync-intel -- fmo     # sync single package
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

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
  package: { name: string; description: string; version: number; company: string };
  feed: { categories: string[]; limit: number; sort: string };
  required_sources: RequiredSource[];
  transcripts: { minDurationSec: number; maxRetryDays: number };
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

const packagesDir = fileURLToPath(new URL("../../../intel/packages", import.meta.url));

// Determine which packages to sync
const targetPackage = process.argv[2];
let packageFiles: string[];

if (targetPackage && targetPackage !== "all") {
  const filePath = join(packagesDir, `${targetPackage}.json`);
  if (!existsSync(filePath)) {
    console.error(`ERROR: Package '${targetPackage}' not found at ${filePath}`);
    console.error(
      `Available packages: ${readdirSync(packagesDir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(".json", ""))
        .join(", ")}`,
    );
    process.exit(1);
  }
  packageFiles = [`${targetPackage}.json`];
} else {
  packageFiles = readdirSync(packagesDir).filter((f) => f.endsWith(".json"));
  if (packageFiles.length === 0) {
    console.error(`ERROR: No package files found in ${packagesDir}`);
    process.exit(1);
  }
}

// Fetch existing sources from Intel Hub (once for all packages)
const sourcesRes = await fetch(`${INTEL_HUB}/api/intel/sources`, { headers });
if (!sourcesRes.ok) {
  console.error(`ERROR: Failed to fetch sources: ${sourcesRes.status} ${sourcesRes.statusText}`);
  process.exit(1);
}

const sourcesData = (await sourcesRes.json()) as {
  ok: boolean;
  items: { id: string }[];
};
const existingIds = new Set((sourcesData.items ?? []).map((s) => s.id));

let totalCreated = 0;
let totalSkipped = 0;

for (const file of packageFiles) {
  const pkgPath = join(packagesDir, file);
  let pkg: IntelPackage;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  } catch {
    console.error(`ERROR: Could not parse ${pkgPath}`);
    continue;
  }

  // Runtime schema validation
  if (
    !pkg.package?.name ||
    !Array.isArray(pkg.required_sources) ||
    !Array.isArray(pkg.feed?.categories)
  ) {
    console.error(
      `ERROR: Invalid package schema in ${file} — missing package.name, required_sources, or feed.categories`,
    );
    continue;
  }

  console.log(`\n[${pkg.package.name}] ${pkg.package.description} (v${pkg.package.version})`);
  console.log(`  Categories: ${pkg.feed.categories.join(", ")}`);
  console.log(`  Required sources: ${pkg.required_sources.length}`);

  for (const source of pkg.required_sources) {
    if (existingIds.has(source.id)) {
      console.log(`  SKIP  ${source.id} — already exists`);
      totalSkipped++;
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
      }
    } catch {
      console.warn(`  WARN  ${source.id} — could not reach feed URL: ${source.url}`);
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
      totalCreated++;
    } else {
      const err = await createRes.text();
      console.error(`  FAIL  ${source.id} — ${createRes.status}: ${err}`);
    }
  }
}

console.log(
  `\nDone. ${totalCreated} created, ${totalSkipped} already existed across ${packageFiles.length} package(s).`,
);
