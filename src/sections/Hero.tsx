import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../hooks/useSmoothScroll'

// 두 배경 영상을 크로스페이드로 순환 (소프트웨어 엔지니어링 + 피지컬AI)
const HERO_VIDEOS = ['/hero.mp4', '/hero1.mp4']
const CROSSFADE = 1.1 // 끝나기 n초 전부터 다음 영상으로 교차 전환

// 태그라인에서 강조할 키워드 (입력/출력)
const EMPHASIS: Record<'ko' | 'en', string[]> = {
  ko: ['입력', '출력'],
  en: ['input', 'output'],
}

/** 태그라인의 핵심 단어(입력/출력)를 밝은 흰색 볼드로 강조 렌더링. */
function renderTagline(tagline: string, words: string[]) {
  const parts = tagline.split(new RegExp(`(${words.join('|')})`, 'gi'))
  return parts.map((part, i) =>
    words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-paper">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

export default function Hero() {
  const { t, lang } = useLang()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const switching = useRef(false)
  const [active, setActive] = useState(0)

  // 첫 영상 재생 시작
  useEffect(() => {
    if (reduced) return
    const first = videoRefs.current[0]
    first?.play().catch(() => {})
  }, [reduced])

  // 현재 영상이 끝나갈 때 다음 영상으로 자연스럽게 교차 전환 → 무한 루프
  const advance = (from: number) => {
    if (switching.current || from !== active) return
    switching.current = true
    const next = (from + 1) % HERO_VIDEOS.length
    const nv = videoRefs.current[next]
    if (nv) {
      nv.currentTime = 0
      nv.play().catch(() => {})
    }
    setActive(next)
    window.setTimeout(() => {
      switching.current = false
    }, CROSSFADE * 1000)
  }

  const handleTimeUpdate = (idx: number) => () => {
    const v = videoRefs.current[idx]
    if (!v || idx !== active) return
    if (v.duration && v.currentTime >= v.duration - CROSSFADE) advance(idx)
  }

  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('[data-char]', scope)

      if (reduced) {
        gsap.set(chars, { opacity: 1, y: 0, filter: 'blur(0px)' })
        gsap.set('[data-hero-fade]', { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ delay: 0.25 })
      tl.fromTo(
        chars,
        { yPercent: 120, opacity: 0, filter: 'blur(12px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.05,
        },
      )
      tl.fromTo(
        '[data-hero-fade]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        '-=0.4',
      )

      gsap.to('[data-hero-parallax]', {
        yPercent: -18,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('[data-hero-video]', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, scope)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 sm:px-8"
    >
      {/* 배경: 두 영상 크로스페이드 순환 (reduced-motion 시 포스터 이미지) */}
      <div data-hero-video className="absolute inset-0 -z-10">
        {reduced ? (
          <img
            src="/hero-poster.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.28]"
          />
        ) : (
          HERO_VIDEOS.map((src, i) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[i] = el
              }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: active === i ? 0.28 : 0 }}
              muted
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              onTimeUpdate={handleTimeUpdate(i)}
              onEnded={() => advance(i)}
            >
              <source src={src} type="video/mp4" />
            </video>
          ))
        )}
        {/* 가독성 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      <div data-hero-parallax className="mx-auto w-full max-w-6xl">
        <div
          data-hero-fade
          className="mb-7 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.3em] text-paper/50"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-paper" />
          {t.hero.role}
        </div>

        <h1 className="font-display font-semibold leading-[0.92] tracking-tightest">
          {profile.heroLines.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <span className="inline-block whitespace-nowrap">
                {line.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    data-char
                    className="inline-block text-[16vw] sm:text-[13vw] lg:text-[11rem] xl:text-[12rem]"
                  >
                    {ch === ' ' ? ' ' : ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl break-keep text-lg text-paper/55 sm:text-xl"
        >
          {renderTagline(t.hero.tagline, EMPHASIS[lang])}
        </p>
      </div>

      {/* 스크롤 큐 */}
      <button
        data-hero-fade
        onClick={() => scrollToId('about')}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-paper/40 transition-colors hover:text-paper/80"
      >
        {t.hero.scroll}
        <span className="relative block h-9 w-px overflow-hidden bg-paper/20">
          <span
            className="absolute inset-x-0 top-0 h-3 bg-paper"
            style={{ animation: 'scrolldot 1.6s ease-in-out infinite' }}
          />
        </span>
      </button>
    </section>
  )
}
