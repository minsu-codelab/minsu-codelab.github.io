import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { useLang } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading label={t.about.label} heading={t.about.heading} />

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {t.about.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-lg leading-relaxed text-paper/70"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {t.about.pillars.map((pil, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 6 }}
              className="group rounded-xl border border-paper/10 bg-paper/[0.02] p-5 transition-colors hover:border-paper/30"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-paper/40">0{i + 1}</span>
                <h3 className="font-display text-lg font-medium">{pil.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-paper/55">{pil.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
