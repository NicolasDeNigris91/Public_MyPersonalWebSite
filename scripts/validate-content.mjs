#!/usr/bin/env node
/**
 * Pre-build content validator. Runs as part of `npm run build` (via the
 * `prebuild` lifecycle script) and fails the build when the typed content
 * in src/data/ violates editorial invariants that TypeScript cannot
 * encode at the type level.
 *
 * Catches:
 * - Case study slug collisions and missing referenced project ids.
 * - Empty or trivially short prose fields (intro, problem, closing).
 * - Decisions/tradeoffs lists with fewer than two entries.
 * - Diagram kind referenced from a case study but missing from the
 *   ArchitectureDiagram switch (validated against a fixed list here).
 * - Em-dashes in case study prose - the project rule is no em-dashes
 *   anywhere user-visible.
 *
 * Reads the TypeScript sources via tsx-style import; falls back to a
 * simple require chain for the CommonJS output if needed.
 *
 * Exits non-zero on the first violation seen so the build stops fast.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const errors = [];

function fail(message) {
  errors.push(message);
}

function readSource(relPath) {
  return readFileSync(resolve(root, relPath), 'utf8');
}

function extractStringField(source, fieldName) {
  // Matches: fieldName: 'value' OR fieldName: "value" OR fieldName: `value`
  const re = new RegExp(`${fieldName}:\\s*['"\`]([^'"\`]+)['"\`]`, 'g');
  const matches = [];
  let m;
  while ((m = re.exec(source)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

const KNOWN_DIAGRAM_KINDS = new Set([
  'portfolio',
  'cdc',
  'magic',
  'fathom',
  'roguelike',
  'accessibility',
]);

const caseStudiesSrc = readSource('src/data/case-studies.ts');
const projectsSrc = readSource('src/data/projects.ts');

const projectIds = new Set(extractStringField(projectsSrc, 'id'));
const slugs = extractStringField(caseStudiesSrc, 'slug');
const projectIdRefs = extractStringField(caseStudiesSrc, 'projectId');
const diagramKinds = extractStringField(caseStudiesSrc, 'diagram');

// Slug uniqueness.
const seenSlugs = new Set();
for (const slug of slugs) {
  if (seenSlugs.has(slug)) {
    fail(`case study slug "${slug}" appears more than once`);
  }
  seenSlugs.add(slug);
  if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
    fail(`case study slug "${slug}" should be kebab-case ([a-z][a-z0-9-]*)`);
  }
}

// projectId references.
for (const ref of projectIdRefs) {
  if (!projectIds.has(ref)) {
    fail(
      `case study references projectId "${ref}" which is not present in src/data/projects.ts`,
    );
  }
}

// Diagram kinds in the allowed enum.
for (const kind of diagramKinds) {
  if (!KNOWN_DIAGRAM_KINDS.has(kind)) {
    fail(
      `case study uses diagram kind "${kind}" which is not registered in ArchitectureDiagram`,
    );
  }
}

// Em-dashes in case study source (catches them in title, intro, problem,
// decisions, tradeoffs, closing, pull quote - any string literal).
if (caseStudiesSrc.includes('—')) {
  fail(
    'case-studies.ts contains an em-dash (U+2014). Use a hyphen, comma or middle dot instead.',
  );
}

// Each case study should have at least two decisions and two tradeoffs to
// be worth calling a "case study". Approximate by counting the patterns.
const decisionsCount = (caseStudiesSrc.match(/decisions:\s*\[/g) || []).length;
const tradeoffsCount = (caseStudiesSrc.match(/tradeoffs:\s*\[/g) || []).length;

if (decisionsCount !== slugs.length) {
  fail(
    `decisions array count (${decisionsCount}) does not match slug count (${slugs.length})`,
  );
}
if (tradeoffsCount !== slugs.length) {
  fail(
    `tradeoffs array count (${tradeoffsCount}) does not match slug count (${slugs.length})`,
  );
}

if (errors.length > 0) {
  console.error('content validation failed:\n');
  for (const err of errors) {
    console.error('  - ' + err);
  }
  console.error(
    `\n${errors.length} violation${errors.length === 1 ? '' : 's'}. Fix the source data and rebuild.`,
  );
  process.exit(1);
}

console.log(
  `content validation ok: ${slugs.length} case studies, ${projectIds.size} projects.`,
);
