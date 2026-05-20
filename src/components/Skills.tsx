import { Fragment } from 'react';
import { skillsData } from '@/data/site';

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export function Skills() {
  const totalItems = skillsData.reduce(
    (sum, skill) => sum + skill.items.length,
    0,
  );

  return (
    <section id="skills" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="border-mist/30 mb-16 flex flex-col gap-8 border-b pb-10 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-caption text-racing-green-lit tracking-luxury mb-3 font-mono uppercase">
              Inventário técnico
            </p>
            <h2 className="font-display text-display-lg text-pearl">
              Skills e ferramentas
            </h2>
          </div>
          <p className="text-left md:text-right">
            <strong
              data-numeric
              className="font-display text-gold-leaf mb-1 block text-2xl font-normal italic"
            >
              {totalItems}
            </strong>
            <span className="text-caption tracking-luxury text-mist font-mono uppercase">
              itens em quatro categorias
            </span>
          </p>
        </div>

        <ol className="list-none">
          {skillsData.map((skill, idx) => (
            <li
              key={skill.category}
              className="border-mist/20 grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-4 border-b py-9 last:border-b-0 md:grid-cols-[4rem_14rem_1fr] md:gap-x-12"
            >
              <span
                aria-hidden="true"
                className="font-display text-gold-leaf text-4xl leading-none font-light italic"
              >
                {ROMAN_NUMERALS[idx]}.
              </span>
              <h3 className="font-display text-pearl text-[1.75rem] leading-tight tracking-tight">
                {skill.category}
              </h3>
              <p className="text-body-lg text-chrome col-span-2 font-sans leading-[1.85] font-light md:col-span-1">
                {skill.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="font-display text-gold-leaf mx-2 opacity-70"
                      >
                        ·
                      </span>
                    )}
                    {item}
                  </Fragment>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
