import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Flow, FlowNode } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface FlowGraphProps {
  flow: Flow
  kicker: string
  compact?: boolean
}

/**
 * 단계(step) 기반 흐름도. 단일 단계는 노드 하나, 병렬 단계는 묶음 박스로 렌더.
 * 신호가 단계→단계로 흐르고, 병렬 단계에서는 모든 노드가 동시에 점등(분기→수렴).
 * 데스크톱은 가로, 모바일은 세로. reduced-motion 시 정적 다이어그램.
 */
export default function FlowGraph({ flow, kicker, compact = false }: FlowGraphProps) {
  const { lang } = useLang()
  const reduced = useReducedMotion()
  const scope = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const el = scope.current
    if (!el) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cols = gsap.utils.toArray<HTMLElement>('[data-col]', el)
      const connectors = gsap.utils.toArray<HTMLElement>('[data-connector]', el)
      if (!cols.length) return
      const mm = gsap.matchMedia(el)

      const build = (axis: 'x' | 'y') => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.6,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play pause resume pause' },
        })
        const litOf = (col: HTMLElement) => gsap.utils.toArray<HTMLElement>('[data-node]', col)
        tl.set(el.querySelectorAll('[data-node]'), { '--lit': 0 })
        tl.to(litOf(cols[0]), { '--lit': 1, duration: 0.25 }, 0)

        connectors.forEach((connector, i) => {
          const dot = connector.querySelector<HTMLElement>('[data-dot]')
          const line = connector.querySelector<HTMLElement>('[data-line-fill]')
          const at = 0.3 + i * 0.55
          if (line)
            tl.fromTo(line, { scaleX: axis === 'x' ? 0 : 1, scaleY: axis === 'y' ? 0 : 1 }, { scaleX: 1, scaleY: 1, duration: 0.5, ease: 'none' }, at)
          if (dot) {
            tl.set(dot, { opacity: 1 }, at)
            const from = axis === 'x' ? { left: '0%', top: '50%' } : { top: '0%', left: '50%' }
            const to = axis === 'x' ? { left: '100%' } : { top: '100%' }
            tl.fromTo(dot, from, { ...to, duration: 0.5, ease: 'none' }, at)
            tl.to(dot, { opacity: 0, duration: 0.15 }, at + 0.5)
          }
          if (cols[i + 1]) tl.to(litOf(cols[i + 1]), { '--lit': 1, duration: 0.25 }, at + 0.45)
        })

        tl.to({}, { duration: 0.5 })
        tl.to(el.querySelectorAll('[data-node]'), { '--lit': 0, duration: 0.4 }, '+=0.2')
        tl.set(
          connectors.map((c) => c.querySelector('[data-line-fill]')),
          { scaleX: 0, scaleY: 0 },
        )
        return () => tl.kill()
      }

      mm.add('(min-width: 768px)', () => build('x'))
      mm.add('(max-width: 767px)', () => build('y'))
      return () => mm.revert()
    }, el)

    return () => ctx.revert()
  }, [reduced, lang])

  const pad = compact ? 'px-3 py-2.5 min-h-[42px]' : 'px-4 py-3 min-h-[52px]'
  const txt = compact ? 'text-[12px]' : 'text-[14px]'

  const Node = ({ node }: { node: FlowNode }) => (
    <div
      data-node
      style={{ ['--lit' as string]: reduced ? 1 : 0 }}
      className={['group relative flex flex-1 items-center justify-center rounded-lg border text-center transition-colors', pad].join(' ')}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{
          opacity: 'var(--lit)',
          boxShadow: node.emphasis
            ? '0 0 0 1px rgba(250,250,250,0.9), 0 0 22px rgba(250,250,250,0.22)'
            : '0 0 0 1px rgba(250,250,250,0.7), 0 0 12px rgba(250,250,250,0.12)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg border" style={{ borderColor: node.emphasis ? 'rgba(250,250,250,0.28)' : 'rgba(250,250,250,0.14)' }} />
      <span className={['relative z-10 block text-balance break-keep leading-snug', txt, node.emphasis ? 'font-semibold text-paper' : 'text-paper/85'].join(' ')}>
        {node.label[lang]}
      </span>
    </div>
  )

  const Connector = () => (
    <div data-connector className="relative flex h-7 items-center justify-center md:h-auto md:w-9 md:flex-shrink-0">
      <div className="absolute bg-paper/12 left-1/2 top-0 bottom-0 w-px md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full md:bottom-auto" />
      <div data-line-fill className="absolute bg-paper/45 left-1/2 top-0 bottom-0 w-px origin-top md:left-0 md:right-0 md:top-1/2 md:h-px md:w-full md:origin-left" style={{ transform: reduced ? 'none' : 'scaleX(0) scaleY(0)' }} />
      {!reduced && (
        <span data-dot className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper opacity-0" style={{ boxShadow: '0 0 10px 2px rgba(250,250,250,0.7)', left: '0%', top: '50%' }} />
      )}
    </div>
  )

  return (
    <div ref={scope} className="w-full">
      <div className="mb-2 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.25em] text-paper/70">
        <span className="inline-block h-px w-6 bg-paper/40" />
        {kicker}
      </div>
      {!compact && <div className="mb-6 text-center font-mono text-sm text-paper/70">{flow.title[lang]}</div>}

      <div className="flex flex-col items-stretch justify-center md:flex-row">
        {flow.steps.map((step, i) => (
          <div key={i} className="flex flex-col items-stretch md:flex-1 md:flex-row md:items-stretch">
            {/* 단일 단계 vs 병렬 묶음 */}
            {step.parallel ? (
              <div data-col className="relative flex flex-1 flex-col gap-1.5 rounded-xl border border-dashed border-paper/25 p-2.5 md:gap-2">
                {step.note && (
                  <span className="text-center text-[11px] uppercase tracking-[0.2em] text-paper/60">
                    {step.note[lang]}
                  </span>
                )}
                {step.nodes.map((n) => (
                  <Node key={n.id} node={n} />
                ))}
              </div>
            ) : (
              <div data-col className="flex flex-1">
                <Node node={step.nodes[0]} />
              </div>
            )}

            {i < flow.steps.length - 1 && <Connector />}
          </div>
        ))}
      </div>
    </div>
  )
}
