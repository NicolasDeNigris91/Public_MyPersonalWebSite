import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 py-12 border-t border-mist">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-caption text-mist tracking-wide">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono text-caption text-mist tracking-wide">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
