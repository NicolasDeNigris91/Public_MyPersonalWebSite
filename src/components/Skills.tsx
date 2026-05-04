import { skillsData } from '@/data/site';

// Server component. Skills is below the fold and the only "motion" the
// section needs is a calm fade-in once it scrolls into view, which a tiny
// CSS animation handles without shipping framer-motion variants for it.
export function Skills() {
  return (
    <section id="skills" className="px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col">
          <h2 className="font-display text-display-lg text-pearl">
            Skills e ferramentas
          </h2>
          <div className="bg-gold-leaf mt-6 h-px w-32" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skillsData.map((skill) => (
            <div key={skill.category}>
              <h3 className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase">
                {skill.category}
              </h3>
              <ul className="space-y-3">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="bg-gold-leaf h-1 w-1 flex-shrink-0 rounded-full" />
                    <span className="text-body text-chrome font-sans">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
