import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'
import { scrollToId } from '../hooks/useSmoothScroll'

const SECTIONS = ['about', 'skills', 'work', 'journey', 'contact'] as const

export default function Nav() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-paper/10 bg-ink/70 backdrop-blur-md' : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => go('hero')}
          className="font-display text-sm font-semibold tracking-tightest text-paper"
        >
          YMS<span className="text-paper/55">.dev</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="group relative text-[14px] uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper"
            >
              {t.nav[s]}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="relative flex h-8 items-center rounded-full border border-paper/20 px-1 text-[12px] font-medium"
          >
            {(['ko', 'en'] as const).map((l) => (
              <span key={l} className="relative px-2.5 py-0.5 uppercase">
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-paper"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${lang === l ? 'text-ink' : 'text-paper/70'}`}>
                  {l}
                </span>
              </span>
            ))}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-5 bg-paper transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-paper transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-paper/10 bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {SECTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => go(s)}
                  className="py-3 text-left text-sm uppercase tracking-[0.18em] text-paper/70"
                >
                  {t.nav[s]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
