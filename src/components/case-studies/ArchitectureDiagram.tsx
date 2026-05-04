import type { DiagramKind } from '@/types/case-study';

interface DiagramNode {
  label: string;
  caption?: string;
}

const DIAGRAMS: Record<DiagramKind, { title: string; nodes: DiagramNode[] }> = {
  portfolio: {
    title: 'Fluxo de uma requisição',
    nodes: [
      { label: 'Browser', caption: 'pt-BR · obsidian/gold-leaf' },
      { label: 'Edge', caption: 'middleware: nonce + CSP' },
      { label: 'Server', caption: 'RSC · headers() · JSON-LD' },
      { label: 'Railway', caption: 'standalone · Caddy' },
    ],
  },
  cdc: {
    title: 'Pipeline de change data capture',
    nodes: [
      { label: 'Postgres WAL', caption: 'logical replication · pgoutput' },
      { label: 'Debezium', caption: 'connector · snapshot + stream' },
      { label: 'Kafka', caption: 'acks=all · replication 3' },
      { label: 'Go transformer', caption: 'goroutines por collection' },
      { label: 'MongoDB sink', caption: 'upsert por (chave, LSN)' },
    ],
  },
  magic: {
    title: 'Estado, input e projeção',
    nodes: [
      { label: 'Input', caption: 'kbd · leitor de tela · mouse' },
      { label: 'Engine de regras', caption: 'ações tipadas · puro' },
      { label: 'Estado Zustand', caption: 'snapshot · devtools' },
      { label: 'UI', caption: 'aria · live regions · motion' },
    ],
  },
  fathom: {
    title: 'Pipeline de conteúdo do framework',
    nodes: [
      { label: 'Markdown', caption: 'frontmatter tipado · CC BY-NC' },
      { label: 'Validador', caption: 'links cruzados · ordem · capstones' },
      { label: 'Next.js reader', caption: 'filesystem em runtime' },
      { label: 'Leitor', caption: 'Cmd+K · glossário · sitemap' },
    ],
  },
  roguelike: {
    title: 'Export e entrega no navegador',
    nodes: [
      { label: 'Godot 4', caption: 'GDScript · turn-based' },
      { label: 'WebAssembly', caption: 'export web · SharedArrayBuffer' },
      { label: 'Caddy', caption: 'COEP · COOP · Brotli' },
      { label: 'Browser', caption: 'cross-origin isolated' },
    ],
  },
  accessibility: {
    title: 'Auditoria assíncrona por URL',
    nodes: [
      { label: 'Dashboard', caption: 'URL · botão' },
      { label: 'API Express', caption: 'publica job · BullMQ' },
      { label: 'Redis', caption: 'fila · throttling natural' },
      { label: 'Worker', caption: 'Puppeteer + axe-core' },
      { label: 'MongoDB', caption: 'documento por run' },
    ],
  },
};

interface ArchitectureDiagramProps {
  kind: DiagramKind;
}

export function ArchitectureDiagram({ kind }: ArchitectureDiagramProps) {
  const { title, nodes } = DIAGRAMS[kind];

  return (
    <figure className="my-12 w-full overflow-x-auto">
      <p className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase">
        {title}
      </p>
      <div className="border-mist/40 flex min-w-fit items-stretch border-y py-8">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex items-center">
            <div className="flex min-w-[140px] flex-col gap-2 px-4">
              <span className="font-display text-display-md text-pearl leading-tight tracking-tight">
                {node.label}
              </span>
              {node.caption ? (
                <span className="text-caption text-mist font-mono leading-snug tracking-wide">
                  {node.caption}
                </span>
              ) : null}
            </div>
            {i < nodes.length - 1 ? (
              <svg
                aria-hidden="true"
                width="56"
                height="20"
                viewBox="0 0 56 20"
                className="flex-shrink-0"
              >
                <line
                  x1="0"
                  y1="10"
                  x2="48"
                  y2="10"
                  stroke="var(--color-gold-leaf)"
                  strokeWidth="0.75"
                />
                <polyline
                  points="44,6 50,10 44,14"
                  fill="none"
                  stroke="var(--color-gold-leaf)"
                  strokeWidth="0.75"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className="text-caption text-mist mt-3 font-mono tracking-wide">
        Diagrama esquemático · não é o mapa completo do sistema.
      </figcaption>
    </figure>
  );
}
