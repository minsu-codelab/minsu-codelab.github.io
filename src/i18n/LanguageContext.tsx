import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { dict, type Dict } from './dict'

export type Lang = 'ko' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'portfolio-lang'

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'ko'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'ko' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(
    () => setLangState((p) => (p === 'ko' ? 'en' : 'ko')),
    [],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dict[lang] }),
    [lang, setLang, toggle],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

/** Helper: pick the active-language string from a bilingual pair. */
export type L10n = { ko: string; en: string }
// eslint-disable-next-line react-refresh/only-export-components
export function pick(value: L10n, lang: Lang): string {
  return value[lang]
}
