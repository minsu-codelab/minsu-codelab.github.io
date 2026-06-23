import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Shot } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

const INTERVAL = 4000

/**
 * 프로젝트 UI 스크린샷 슬라이드쇼. 일정 시간마다 크로스페이드로 자동 전환.
 * 호버 시 일시정지, 점 네비게이션, 클릭 시 라이트박스 확대. reduced-motion 시 자동전환 끔.
 */
export default function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const count = shots.length

  const go = useCallback((n: number) => setIdx((n + count) % count), [count])

  // 자동 전환
  useEffect(() => {
    if (reduced || paused || lightbox || count <= 1) return
    const t = window.setInterval(() => setIdx((p) => (p + 1) % count), INTERVAL)
    return () => window.clearInterval(t)
  }, [reduced, paused, lightbox, count])

  // 라이트박스 키보드
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') go(idx + 1)
      if (e.key === 'ArrowLeft') go(idx - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, idx, go])

  const touchX = useRef<number | null>(null)

  if (!count) return null
  const active = shots[idx]

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/40">
          <span className="inline-block h-px w-6 bg-paper/30" />
          {lang === 'ko' ? '화면' : 'Screens'}
        </div>
        <span className="font-mono text-[11px] text-paper/35">
          {String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>

      {/* 슬라이드 */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-paper/10 bg-black/40"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1))
          touchX.current = null
        }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={idx}
            src={active.src}
            alt={active.caption[lang]}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full cursor-zoom-in object-cover object-top"
            onClick={() => setLightbox(true)}
          />
        </AnimatePresence>

        {/* 캡션 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-10">
          <p className="break-keep text-[13px] text-paper/90">{active.caption[lang]}</p>
        </div>

        {/* 좌우 버튼 (호버 시) */}
        {count > 1 && (
          <>
            <button
              aria-label="prev"
              onClick={() => go(idx - 1)}
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-paper/80 opacity-0 backdrop-blur transition-opacity hover:bg-ink/80 group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              aria-label="next"
              onClick={() => go(idx + 1)}
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-paper/80 opacity-0 backdrop-blur transition-opacity hover:bg-ink/80 group-hover:opacity-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* 점 네비 */}
      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {shots.map((_, i) => (
            <button
              key={i}
              aria-label={`slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={[
                'h-1.5 rounded-full transition-all',
                i === idx ? 'w-6 bg-paper' : 'w-1.5 bg-paper/30 hover:bg-paper/60',
              ].join(' ')}
            />
          ))}
        </div>
      )}

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
            onClick={() => setLightbox(false)}
          >
            <div className="absolute right-5 top-5 text-xs uppercase tracking-[0.2em] text-paper/50">
              {name} · Esc
            </div>
            <motion.img
              key={idx}
              src={active.src}
              alt={active.caption[lang]}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[82vh] max-w-[92vw] rounded-lg border border-paper/15 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 break-keep text-center text-sm text-paper/70">{active.caption[lang]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
