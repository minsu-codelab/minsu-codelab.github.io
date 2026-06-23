import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lenis 부드러운 스크롤을 GSAP ScrollTrigger와 연동.
 * 모션 축소(reduced) 시에는 Lenis를 띄우지 않고 기본 네이티브 스크롤 사용.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!enabled) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onRaf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    // 앵커 클릭 시 부드럽게 이동하도록 노출
    ;(window as Window & { __lenis?: Lenis }).__lenis = lenis

    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      delete (window as Window & { __lenis?: Lenis }).__lenis
    }
  }, [enabled])
}

/** 네비게이션 앵커용: Lenis가 있으면 Lenis로, 없으면 네이티브 스크롤. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
