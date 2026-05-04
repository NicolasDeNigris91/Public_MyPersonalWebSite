import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface LegacyReport {
  'csp-report': {
    'document-uri'?: string;
    referrer?: string;
    'violated-directive'?: string;
    'effective-directive'?: string;
    'original-policy'?: string;
    disposition?: string;
    'blocked-uri'?: string;
    'line-number'?: number;
    'column-number'?: number;
    'source-file'?: string;
    'status-code'?: number;
    'script-sample'?: string;
  };
}

interface ReportingApiEntry {
  type: string;
  url: string;
  body: {
    documentURL?: string;
    blockedURL?: string;
    effectiveDirective?: string;
    originalPolicy?: string;
    disposition?: string;
    sourceFile?: string;
    lineNumber?: number;
    columnNumber?: number;
    statusCode?: number;
    sample?: string;
  };
}

interface NormalisedReport {
  documentUri?: string;
  blockedUri?: string;
  directive?: string;
  sourceFile?: string;
  line?: number;
  column?: number;
  sample?: string;
}

// Browser extensions, devtools and bookmarklets routinely trigger CSP
// reports that have no relation to the site itself. Drop them at the edge
// so the log stays useful for actual policy issues.
const NOISE_PREFIXES = [
  'chrome-extension://',
  'moz-extension://',
  'safari-extension://',
  'safari-web-extension://',
  'about:',
  'data:',
];

const NOISE_BLOCKED_URI_VALUES = new Set(['inline', 'eval', 'self', '']);

function normalise(body: unknown): NormalisedReport[] {
  if (!body || typeof body !== 'object') return [];
  // Reporting API payloads are arrays.
  if (Array.isArray(body)) {
    return body
      .filter((entry): entry is ReportingApiEntry => {
        return (
          typeof entry === 'object' &&
          entry !== null &&
          (entry as { type?: unknown }).type === 'csp-violation' &&
          typeof (entry as { body?: unknown }).body === 'object'
        );
      })
      .map((entry) => ({
        documentUri: entry.body.documentURL,
        blockedUri: entry.body.blockedURL,
        directive: entry.body.effectiveDirective,
        sourceFile: entry.body.sourceFile,
        line: entry.body.lineNumber,
        column: entry.body.columnNumber,
        sample: entry.body.sample,
      }));
  }
  // Legacy report-uri payloads are objects with a top-level "csp-report".
  if ('csp-report' in (body as object)) {
    const r = (body as LegacyReport)['csp-report'];
    return [
      {
        documentUri: r['document-uri'],
        blockedUri: r['blocked-uri'],
        directive: r['effective-directive'] ?? r['violated-directive'],
        sourceFile: r['source-file'],
        line: r['line-number'],
        column: r['column-number'],
        sample: r['script-sample'],
      },
    ];
  }
  return [];
}

function isNoise(report: NormalisedReport): boolean {
  const blocked = (report.blockedUri ?? '').toLowerCase();
  if (NOISE_BLOCKED_URI_VALUES.has(blocked)) return false;
  if (NOISE_PREFIXES.some((prefix) => blocked.startsWith(prefix))) return true;
  const sourceFile = (report.sourceFile ?? '').toLowerCase();
  if (NOISE_PREFIXES.some((prefix) => sourceFile.startsWith(prefix))) {
    return true;
  }
  return false;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // Malformed JSON: still 204 per CSP spec - the browser does not retry,
    // and noisy 4xx replies just clutter the report stream.
    return new NextResponse(null, { status: 204 });
  }

  const reports = normalise(body).filter((r) => !isNoise(r));
  if (reports.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  for (const report of reports) {
    console.warn(
      '[csp-report]',
      JSON.stringify(
        {
          documentUri: report.documentUri,
          blockedUri: report.blockedUri,
          directive: report.directive,
          sourceFile: report.sourceFile,
          line: report.line,
          column: report.column,
          sample: report.sample?.slice(0, 200),
        },
        null,
        process.env.NODE_ENV === 'production' ? 0 : 2,
      ),
    );
  }

  return new NextResponse(null, { status: 204 });
}
