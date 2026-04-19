#!/usr/bin/env node
/**
 * Copies dendrux docs MDX into the landing repo's content/docs/ folder.
 *
 * Source of truth lives in the dendrux repo (docs/*.mdx). The landing repo
 * is the renderer; it should never contain doc source.
 *
 * Resolution order:
 *   1. DENDRUX_DOCS_PATH env var → copy from that path (local dev shortcut).
 *   2. Otherwise → sparse + shallow clone github.com/dendrux/dendrux at
 *      DENDRUX_DOCS_REF (default "main") and copy docs/ over. No auth needed
 *      because the repo is public. Only the docs/ subtree is fetched.
 */

import { cp, mkdir, rm, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";

const REPO_URL = process.env.DENDRUX_REPO_URL || "https://github.com/dendrux/dendrux.git";
const REF = process.env.DENDRUX_DOCS_REF || "main";

// Default local checkout — used only if it actually exists on disk. Falls
// through to `git clone` otherwise, so CI (and anyone without this path)
// still builds.
const DEFAULT_LOCAL =
  "/Users/anmolgautam/Desktop/finoco/Project-Orbit/excel-agent/dendrite/docs";

const localPath = process.env.DENDRUX_DOCS_PATH || DEFAULT_LOCAL;
const dest = path.resolve("content/docs");

async function pathExists(p) {
  try {
    const s = await stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}

function run(cmd, args, opts = {}) {
  execFileSync(cmd, args, { stdio: "inherit", ...opts });
}

async function copyFromLocal(source) {
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  await cp(source, dest, { recursive: true });
  console.log(`✓ docs synced  ${source} → ${dest}`);
}

async function cloneFromRepo() {
  const tmp = await import("node:fs/promises").then((m) =>
    m.mkdtemp(path.join(os.tmpdir(), "dendrux-docs-")),
  );
  try {
    console.log(`→ sparse-cloning ${REPO_URL}@${REF} (docs/ only)`);
    run("git", ["clone", "--depth", "1", "--filter=blob:none", "--sparse", "--branch", REF, REPO_URL, tmp]);
    run("git", ["-C", tmp, "sparse-checkout", "set", "docs"]);
    const source = path.join(tmp, "docs");
    if (!(await pathExists(source))) {
      throw new Error(`docs/ missing in cloned repo (ref=${REF})`);
    }
    await copyFromLocal(source);
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

async function main() {
  if (await pathExists(localPath)) {
    await copyFromLocal(localPath);
    return;
  }
  await cloneFromRepo();
}

main().catch((err) => {
  console.error(`✗ sync-docs failed: ${err.message}`);
  process.exit(1);
});
