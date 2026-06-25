import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n/LanguageContext'
import { timeline } from '../data/experience'

export default function Experience() {
  const { lang, t } = useLang()

  return (
    <section id="journey" className="relative border-t border-paper/10 bg-paper/[0.015]">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading label={t.journey.label} heading={t.journey.heading} />

        <div className="mt-14 border-l border-paper/15 pl-6 sm:pl-10">
          {timeline.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pb-12 last:pb-0"
            >
              {/* dot */}
              <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-[47px]">
                <span className="h-2.5 w-2.5 rounded-full bg-paper" />
                <span className="absolute h-3.5 w-3.5 rounded-full border border-paper/40" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-paper/60">{entry.period}</span>
                <span
                  className={[
                    'rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]',
                    entry.kind === 'work'
                      ? 'border-paper/30 text-paper/70'
                      : 'border-paper/10 text-paper/40',
                  ].join(' ')}
                >
                  {entry.kind === 'work' ? 'Work' : 'Education'}
                </span>
              </div>

              <h3 className="mt-2 font-display text-xl font-medium">{entry.title[lang]}</h3>
              <p className="text-sm text-paper/75">{entry.org[lang]}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/70">
                {entry.desc[lang]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
