import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Flow } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SignalFlowProps {
  flow: Flow
  /** 시각적 강조 라벨 (예: 데이터 파이프라인 / 배포) */
  kicker: string
}

/**
 * 입력 → 처리 → 출력 노드 사이를 신호(빛나는 점 + 흐르는 라인)가 이동하는
 * 재사용 다이어그램. fde-factory의 디지털 스레드 연출을 일반화.
 * 데스크톱은 가로, 모바일은 세로 흐름. reduced-motion 시 정적 다이어그램.
 */
export default function SignalFlow({ flow, kicker }: SignalFlowProps) {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const scopeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const scope = scopeRef.current
    if (!scope) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', scope)
      const connectors = gsap.utils.toArray<HTMLElement>('[data-connector]', scope)
      if (!nodes.length) return

      const mm = gsap.matchMedia(scope)

      const buildTimeline = (axis: 'x' | 'y') => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.6,
          scrollTrigger: {
            trigger: scope,
            start: 'top 85%',
            toggleActions: 'play pause resume pause',
          },
        })

        // 첫 노드 점등
        tl.set(nodes, { '--lit': 0 })
        tl.to(nodes[0], { '--lit': 1, duration: 0.25 }, 0)

        connectors.forEach((connector, i) => {
          const dot = connector.querySelector<HTMLElement>('[data-dot]')
          const line = connector.querySelector<HTMLElement>('[data-line-fill]')
          const at = 0.3 + i * 0.55
          if (line) tl.fromTo(line, { scaleX: axis === 'x' ? 0 : 1, scaleY: axis === 'y' ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'none' }, at)
          if (dot) {
            tl.set(dot, { opacity: 1 }, at)
            const from = axis === 'x' ? { left: '0%', top: '50%' } : { top: '0%', left: '50%' }
            const to = axis === 'x' ? { left: '100%' } : { top: '100%' }
            tl.fromTo(dot, from, { ...to, duration: 0.5, ease: 'none' }, at)
            tl.to(dot, { opacity: 0, duration: 0.15 }, at + 0.5)
          }
          // 다음 노드 점등
          if (nodes[i + 1]) tl.to(nodes[i + 1], { '--lit': 1, duration: 0.25 }, at + 0.45)
        })

        // 잠깐 유지 후 리셋
        tl.to({}, { duration: 0.5 })
        tl.to(nodes, { '--lit': 0, duration: 0.4 }, '+=0.2')
        tl.set(connectors.map((c) => c.querySelector('[data-line-fill]')), { scaleX: 0, scaleY: 0 })

        return () => tl.kill()
      }

      mm.add('(min-width: 768px)', () => buildTimeline('x'))
      mm.add('(max-width: 767px)', () => buildTimeline('y'))

      return () => mm.revert()
    }, scope)

    return () => ctx.revert()
  }, [reduced, lang])

  return (
    <div ref={scopeRef} className="w-full">
      <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/40">
        <span className="inline-block h-px w-6 bg-paper/30" />
        {kicker}
      </div>
      <div className="text-sm text-paper/70 mb-5 font-mono">{flow.title[lang]}</div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-0">
        {flow.nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col md:flex-row md:items-stretch md:flex-1">
            {/* Node */}
            <div
              data-node
              style={{ ['--lit' as string]: reduced ? 1 : 0 }}
              className={[
                'group relative flex-1 rounded-lg border px-4 py-3.5 text-center md:text-left',
                'transition-colors',
                node.emphasis ? 'min-h-[64px]' : 'min-h-[56px]',
              ].join(' ')}
            >
              {/* lit overlay driven by --lit */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                  opacity: 'var(--lit)',
                  borderColor: 'rgba(250,250,250,0.9)',
                  boxShadow: node.emphasis
                    ? '0 0 0 1px rgba(250,250,250,0.9), 0 0 24px rgba(250,250,250,0.25)'
                    : '0 0 0 1px rgba(250,250,250,0.7), 0 0 14px rgba(250,250,250,0.12)',
                  borderRadius: '0.5rem',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-lg border"
                style={{
                  borderColor: node.emphasis ? 'rgba(250,250,250,0.28)' : 'rgba(250,250,250,0.14)',
                }}
              />
              <span
                className={[
                  'relative z-10 block text-[13px] leading-snug',
                  node.emphasis ? 'text-paper font-medium' : 'text-paper/75',
                ].join(' ')}
              >
                {node.label[lang]}
              </span>
            </div>

            {/* Connector (마지막 노드 뒤에는 없음) */}
            {i < flow.nodes.length - 1 && (
              <div
                data-connector
                className="relative flex items-center justify-center md:w-12 md:flex-shrink-0 h-8 md:h-auto"
              >
                {/* base track */}
                <div className="absolute bg-paper/12 md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full left-1/2 top-0 bottom-0 w-px md:bottom-auto" />
                {/* animated fill */}
                <div
                  data-line-fill
                  className="absolute bg-paper/45 md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full md:origin-left left-1/2 top-0 bottom-0 w-px origin-top"
                  style={{ transform: reduced ? 'none' : 'scaleX(0) scaleY(0)' }}
                />
                {/* traveling dot */}
                {!reduced && (
                  <span
                    data-dot
                    className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper opacity-0"
                    style={{ boxShadow: '0 0 10px 2px rgba(250,250,250,0.7)', left: '0%', top: '50%' }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
