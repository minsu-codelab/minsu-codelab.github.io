import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { scrollToId } from '../hooks/useSmoothScroll'

export default function Contact() {
  const { lang, t } = useLang()

  return (
    <footer id="contact" className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
      {/* 거대 워터마크 이름 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden"
      >
        <span className="select-none font-display text-[20vw] font-bold leading-none tracking-tightest text-paper/[0.04]">
          {profile.nameEn}
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-paper/40"
        >
          <span className="inline-block h-px w-8 bg-paper/40" />
          {t.contact.label}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 font-display text-5xl font-semibold tracking-tightest sm:text-7xl"
        >
          {t.contact.heading}
        </motion.h2>

        <p className="mt-6 max-w-xl text-lg text-paper/55">{t.contact.line}</p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between bg-ink p-6 transition-colors hover:bg-paper/[0.04]"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-paper/40">
                {t.contact.email}
              </div>
              <div className="mt-1 font-display text-lg">{profile.email}</div>
            </div>
            <span className="text-paper/40 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between bg-ink p-6 transition-colors hover:bg-paper/[0.04]"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-paper/40">
                {t.contact.github}
              </div>
              <div className="mt-1 font-display text-lg">{profile.githubHandle}</div>
            </div>
            <span className="text-paper/40 transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-xs text-paper/35 sm:flex-row sm:items-center">
          <span>
            © 2026 {profile.nameEn} · {profile.location[lang]}
          </span>
          <span className="font-mono">{t.footer.built}</span>
          <button
            onClick={() => scrollToId('hero')}
            className="uppercase tracking-[0.2em] transition-colors hover:text-paper"
          >
            ↑ {t.contact.backToTop}
          </button>
        </div>
      </div>
    </footer>
  )
}
