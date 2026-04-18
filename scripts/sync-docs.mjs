#!/usr/bin/env node
/**
 * Copies dendrux docs MDX into the landing repo's content/docs/ folder.
 *
 * Source of truth lives in the dendrux repo (docs/*.mdx). The landing repo
 * is the renderer; it should never contain doc source.
 *
 * Local dev:  reads from $DENDRUX_DOCS_PATH (defaults to a local sibling).
 * Prod build: would clone dendrux at a tagged release. Not wired yet.
 */

import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const DEFAULT_LOCAL =
  "/Users/anmolgautam/Desktop/finoco/Project-Orbit/excel-agent/dendrite/docs";

const source = process.env.DENDRUX_DOCS_PATH || DEFAULT_LOCAL;
const dest = path.resolve("content/docs");

async function main() {
  try {
    const s = await stat(source);
    if (!s.isDirectory()) throw new Error(`${source} is not a directory`);
  } catch {
    console.error(`✗ source not found: ${source}`);
    console.error(`  set DENDRUX_DOCS_PATH or update sync-docs.mjs`);
    process.exit(1);
  }

  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  await cp(source, dest, { recursive: true });
  console.log(`✓ docs synced  ${source} → ${dest}`);
}

main();
