import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import TechIcon from '../components/TechIcon'
import { useLang } from '../i18n/LanguageContext'
import { skills } from '../data/skills'

export default function Skills() {
  const { lang, t } = useLang()

  return (
    <section id="skills" className="relative border-y border-paper/10 bg-paper/[0.015]">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <SectionHeading label={t.skills.label} heading={t.skills.heading} note={t.skills.note} />

        {/* 5개 카드: lg에서 위 3 + 아래 2(넓게)로 빈칸 없이 배치 */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-6">
          {skills.map((cat, ci) => {
            const span =
              ci < 3 ? 'lg:col-span-2' : ci === 4 ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-3'
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: ci * 0.06 }}
                className={`bg-ink p-6 ${span}`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-[15px] font-semibold tracking-[0.04em] text-paper/95">
                    {cat.label[lang]}
                  </h3>
                  <span className="font-mono text-xs text-paper/50">0{ci + 1}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.05] px-3 py-1.5 text-[13px] text-paper/85 transition-all hover:border-paper/40 hover:bg-paper/[0.08] hover:text-paper"
                    >
                      <TechIcon name={item} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
