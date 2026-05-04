export interface CaseStudySection {
  label: string;
  body: string;
}

export interface PullQuote {
  body: string;
  cite?: string;
}

export interface BeforeAfter {
  label: string;
  before: string;
  after: string;
}

export type DiagramKind =
  | 'portfolio'
  | 'cdc'
  | 'magic'
  | 'fathom'
  | 'roguelike'
  | 'accessibility';

export interface CaseStudy {
  slug: string;
  projectId: string;
  title: string;
  subtitle: string;
  year: number;
  stack: string[];
  href?: string;
  repoHref?: string;
  intro: string;
  problem: string;
  decisions: CaseStudySection[];
  tradeoffs: CaseStudySection[];
  pullQuote: PullQuote;
  beforeAfter?: BeforeAfter[];
  diagram: DiagramKind;
  closing: string;
}
