import Script from 'next/script';

interface PlausibleScriptProps {
  domain?: string;
  host?: string;
  nonce?: string;
}

/**
 * Renders the Plausible script when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * Defaults to the public plausible.io host; self-hosted instances can override
 * via NEXT_PUBLIC_PLAUSIBLE_HOST. When the env var is missing, this returns
 * null and the analytics helpers no-op.
 */
export function PlausibleScript({ domain, host, nonce }: PlausibleScriptProps) {
  if (!domain) return null;
  const base = host?.replace(/\/$/, '') ?? 'https://plausible.io';
  const src = `${base}/js/script.outbound-links.js`;

  return (
    <>
      <Script
        src={src}
        data-domain={domain}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="plausible-init" strategy="afterInteractive" nonce={nonce}>
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };`}
      </Script>
    </>
  );
}
