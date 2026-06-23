import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Flow } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SignalFlowProps {
  flow: Flow
  /** 상단 라벨 (예: 동작 흐름 / 배포·인프라) */
  kicker: string
  /** 보조 흐름용 축소 버전 */
  compact?: boolean
}

/**
 * 입력 → 처리 → 출력 노드 사이를 신호(빛나는 점 + 흐르는 라인)가 이동하는
 * 재사용 다이어그램. 데스크톱은 가로, 모바일은 세로 흐름.
 * 모든 요소 중앙 정렬. reduced-motion 시 정적 다이어그램.
 */
export default function SignalFlow({ flow, kicker, compact = false }: SignalFlowProps) {
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

        tl.set(nodes, { '--lit': 0 })
        tl.to(nodes[0], { '--lit': 1, duration: 0.25 }, 0)

        connectors.forEach((connector, i) => {
          const dot = connector.querySelector<HTMLElement>('[data-dot]')
          const line = connector.querySelector<HTMLElement>('[data-line-fill]')
          const at = 0.3 + i * 0.55
          if (line)
            tl.fromTo(
              line,
              { scaleX: axis === 'x' ? 0 : 1, scaleY: axis === 'y' ? 0 : 1 },
              { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'none' },
              at,
            )
          if (dot) {
            tl.set(dot, { opacity: 1 }, at)
            const from = axis === 'x' ? { left: '0%', top: '50%' } : { top: '0%', left: '50%' }
            const to = axis === 'x' ? { left: '100%' } : { top: '100%' }
            tl.fromTo(dot, from, { ...to, duration: 0.5, ease: 'none' }, at)
            tl.to(dot, { opacity: 0, duration: 0.15 }, at + 0.5)
          }
          if (nodes[i + 1]) tl.to(nodes[i + 1], { '--lit': 1, duration: 0.25 }, at + 0.45)
        })

        tl.to({}, { duration: 0.5 })
        tl.to(nodes, { '--lit': 0, duration: 0.4 }, '+=0.2')
        tl.set(
          connectors.map((c) => c.querySelector('[data-line-fill]')),
          { scaleX: 0, scaleY: 0 },
        )

        return () => tl.kill()
      }

      mm.add('(min-width: 768px)', () => buildTimeline('x'))
      mm.add('(max-width: 767px)', () => buildTimeline('y'))

      return () => mm.revert()
    }, scope)

    return () => ctx.revert()
  }, [reduced, lang])

  const nodePad = compact ? 'px-3 py-2.5 min-h-[44px]' : 'px-4 py-3.5 min-h-[60px]'
  const nodeText = compact ? 'text-[12px]' : 'text-[13px]'

  return (
    <div ref={scopeRef} className="w-full">
      {/* 라벨 + 제목 (중앙 정렬) */}
      <div className="mb-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-paper/40">
        <span className="inline-block h-px w-6 bg-paper/30" />
        {kicker}
      </div>
      {!compact && (
        <div className="mb-6 text-center font-mono text-sm text-paper/60">{flow.title[lang]}</div>
      )}

      {/* 노드 흐름 (중앙 정렬) */}
      <div className="flex flex-col items-stretch justify-center md:flex-row">
        {flow.nodes.map((node, i) => (
          <div
            key={node.id}
            className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-stretch"
          >
            {/* Node */}
            <div
              data-node
              style={{ ['--lit' as string]: reduced ? 1 : 0 }}
              className={[
                'group relative flex flex-1 items-center justify-center rounded-lg border text-center transition-colors',
                nodePad,
              ].join(' ')}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-lg"
                style={{
                  opacity: 'var(--lit)',
                  boxShadow: node.emphasis
                    ? '0 0 0 1px rgba(250,250,250,0.9), 0 0 24px rgba(250,250,250,0.25)'
                    : '0 0 0 1px rgba(250,250,250,0.7), 0 0 14px rgba(250,250,250,0.12)',
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
                  'relative z-10 block break-keep leading-snug',
                  nodeText,
                  node.emphasis ? 'font-medium text-paper' : 'text-paper/75',
                ].join(' ')}
              >
                {node.label[lang]}
              </span>
            </div>

            {/* Connector */}
            {i < flow.nodes.length - 1 && (
              <div
                data-connector
                className="relative flex h-7 items-center justify-center md:h-auto md:w-10 md:flex-shrink-0"
              >
                <div className="absolute bg-paper/12 left-1/2 top-0 bottom-0 w-px md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full md:bottom-auto" />
                <div
                  data-line-fill
                  className="absolute bg-paper/45 left-1/2 top-0 bottom-0 w-px origin-top md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full md:origin-left"
                  style={{ transform: reduced ? 'none' : 'scaleX(0) scaleY(0)' }}
                />
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
