#!/usr/bin/env node
/**
 * Generates CHANGELOG.md from conventional commits since the last
 * version tag (or the start of history if there are no tags yet).
 *
 * Pure git + grouping; no dependency on conventional-changelog. Catches
 * the seven conventional types we use here (feat, fix, perf, refactor,
 * docs, test, chore) and groups by type with a stable ordering so the
 * resulting file diffs cleanly across runs.
 *
 * Usage:
 *   node scripts/generate-changelog.mjs [from-ref] [to-ref]
 *
 * Defaults:
 *   from-ref = the most recent tag matching v*.*.*  or the root commit
 *   to-ref   = HEAD
 *
 * Writes CHANGELOG.md at the repo root. Idempotent - running twice with
 * no new commits produces the same file.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

function git(args) {
  return execFileSync('git', args, {
    cwd: root,
    encoding: 'utf8',
  }).trim();
}

const [, , fromArg, toArg] = process.argv;
const to = toArg ?? 'HEAD';

let from = fromArg;
if (!from) {
  try {
    from = git(['describe', '--tags', '--abbrev=0', '--match', 'v*.*.*']);
  } catch {
    from = git(['rev-list', '--max-parents=0', 'HEAD']).split('\n')[0];
  }
}

const range = from === to ? to : `${from}..${to}`;
const log = git(['log', range, '--pretty=format:%H%x09%s', '--no-merges']);

const SECTIONS = [
  ['feat', 'Features'],
  ['fix', 'Bug fixes'],
  ['perf', 'Performance'],
  ['refactor', 'Refactor'],
  ['docs', 'Docs'],
  ['test', 'Tests'],
  ['chore', 'Chores'],
];

const groups = new Map(SECTIONS.map(([type]) => [type, []]));

if (log.length > 0) {
  for (const line of log.split('\n')) {
    const tab = line.indexOf('\t');
    if (tab === -1) continue;
    const sha = line.slice(0, tab);
    const subject = line.slice(tab + 1);
    const match = subject.match(/^(\w+)(?:\([^)]+\))?(!)?:\s*(.+)$/);
    if (!match) continue;
    const [, type, breaking, message] = match;
    const bucket = groups.get(type);
    if (!bucket) continue;
    bucket.push({ sha, message, breaking: Boolean(breaking) });
  }
}

const today = new Date().toISOString().slice(0, 10);
const lines = [
  '# Changelog',
  '',
  `## ${to === 'HEAD' ? 'Unreleased' : to} - ${today}`,
  '',
  `_Range: \`${range}\`_`,
  '',
];

let totalEntries = 0;
for (const [type, heading] of SECTIONS) {
  const entries = groups.get(type) ?? [];
  if (entries.length === 0) continue;
  totalEntries += entries.length;
  lines.push(`### ${heading}`);
  lines.push('');
  for (const entry of entries) {
    const breaking = entry.breaking ? ' **BREAKING**' : '';
    lines.push(`- ${entry.message}${breaking} (\`${entry.sha.slice(0, 7)}\`)`);
  }
  lines.push('');
}

if (totalEntries === 0) {
  lines.push('_No conventional commits in this range._');
  lines.push('');
}

writeFileSync(resolve(root, 'CHANGELOG.md'), lines.join('\n'), 'utf8');
console.log(`wrote CHANGELOG.md: ${totalEntries} entries across ${range}`);
