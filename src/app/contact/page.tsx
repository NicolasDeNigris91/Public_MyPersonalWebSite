import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { ContactForm } from '@/components/ContactForm';
import { CopyEmailLink } from '@/components/CopyEmailLink';

export const metadata: Metadata = {
  title: 'Contato',
  description: `Mande uma mensagem para ${siteConfig.name}.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contato · ${siteConfig.name}`,
    description: 'Mande uma mensagem ou copie o email direto.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="bg-obsidian relative px-8 py-32 md:px-16 lg:px-24"
    >
      <div className="bg-mist/30 absolute inset-y-32 left-8 w-px md:left-16 lg:left-24" />

      <div className="mx-auto grid max-w-5xl gap-16 pl-8 lg:grid-cols-[1fr_1fr]">
        <header>
          <p className="text-caption text-racing-green-lit tracking-luxury mb-3 font-mono uppercase">
            Contato
          </p>
          <h1 className="font-display text-display-xl text-pearl leading-none tracking-tight italic">
            Vamos conversar
          </h1>
          <div className="bg-gold-leaf mt-6 h-px w-32" />
          <p className="text-body-lg text-chrome mt-8 font-sans leading-relaxed">
            Para projetos, conversas técnicas ou a primeira tentativa de me
            convencer a voltar para a joalharia: o formulário ao lado chega
            direto na minha caixa, com uma queda graciosa para o email caso o
            envio falhe.
          </p>

          <dl className="mt-12 space-y-8">
            <div>
              <dt className="text-caption text-racing-green-lit tracking-luxury mb-2 font-mono uppercase">
                Email
              </dt>
              <dd>
                <CopyEmailLink className="text-body text-pearl hover:text-gold-leaf inline-flex items-center gap-2 font-sans transition-colors duration-300">
                  <Mail size={14} strokeWidth={1} aria-hidden="true" />
                  {siteConfig.email}
                </CopyEmailLink>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-racing-green-lit tracking-luxury mb-2 font-mono uppercase">
                Telefone
              </dt>
              <dd>
                <a
                  href={siteConfig.phoneLink}
                  className="text-body text-pearl hover:text-gold-leaf inline-flex items-center gap-2 font-sans transition-colors duration-300"
                >
                  <Phone size={14} strokeWidth={1} aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-racing-green-lit tracking-luxury mb-2 font-mono uppercase">
                Localização
              </dt>
              <dd className="text-body text-chrome inline-flex items-center gap-2 font-sans">
                <MapPin size={14} strokeWidth={1} aria-hidden="true" />
                {siteConfig.location}
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="form-heading">
          <h2
            id="form-heading"
            className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase"
          >
            Mande uma mensagem
          </h2>
          <ContactForm />
        </section>
      </div>

      <div className="mx-auto mt-20 max-w-5xl pl-8">
        <Link
          href="/"
          className="text-caption tracking-luxury text-chrome hover:text-pearl font-sans uppercase transition-colors duration-300"
        >
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
