import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-mist border-t px-8 py-12 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-caption text-mist font-mono tracking-wide">
          &copy;{' '}
          <span className="tabular-nums">{new Date().getFullYear()}</span>{' '}
          {siteConfig.name}. Todos os direitos reservados.
        </p>
        <nav
          aria-label="Footer"
          className="text-caption text-mist flex flex-wrap items-center gap-x-6 gap-y-2 font-mono tracking-wide"
        >
          <Link
            href="/uses"
            className="hover:text-pearl transition-colors duration-300"
          >
            Uses
          </Link>
          <Link
            href="/now"
            className="hover:text-pearl transition-colors duration-300"
          >
            Now
          </Link>
          <Link
            href="/contact"
            className="hover:text-pearl transition-colors duration-300"
          >
            Contato
          </Link>
          <a
            href="/cv.pdf"
            className="hover:text-pearl transition-colors duration-300"
          >
            CV ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
