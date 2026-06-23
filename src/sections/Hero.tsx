import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/LanguageContext'
import { profile } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../hooks/useSmoothScroll'

export default function Hero() {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const root = useRef<HTMLElement>(null)

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
      // 글자 단위 등장 (아래에서 + 블러 인)
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

      // 스크롤 시 타이틀 패럴랙스 + 페이드
      gsap.to('[data-hero-parallax]', {
        yPercent: -18,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: true },
      })
      // 배경 영상 살짝 줌아웃 패럴랙스
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
      {/* 배경 영상 (public/hero.mp4 가 있으면 재생, 없으면 그라데이션만) */}
      <div className="absolute inset-0 -z-10">
        <video
          data-hero-video
          className="h-full w-full object-cover opacity-[0.28]"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* 가독성 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      <div data-hero-parallax className="mx-auto w-full max-w-6xl">
        <div
          data-hero-fade
          className="mb-7 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.3em] text-paper/50 break-keep whitespace-pre-wrap"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-paper" />
          {t.hero.role}
        </div>

        <h1 className="font-display font-semibold leading-[0.92] tracking-tightest">
          {profile.heroLines.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <span className="inline-block">
                {line.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    data-char
                    className="inline-block text-[clamp(2.5rem,14vw,12rem)] sm:text-[13vw] lg:text-[11rem] xl:text-[12rem]"
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-fade
          className="mt-8 max-w-xl text-lg text-paper/65 sm:text-xl break-keep whitespace-pre-wrap"
        >
          {t.hero.tagline}
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
