import { motion } from 'framer-motion'
import type { Project, ProjectLink } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import SignalFlow from './SignalFlow'

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function LinkPill({ link, label }: { link: ProjectLink; label: string }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-4 py-2 text-[13px] font-medium text-paper/80 transition-all hover:border-paper hover:bg-paper hover:text-ink"
    >
      {label}
      <ArrowIcon />
    </a>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang()

  const linkLabel: Record<ProjectLink['kind'], string> = {
    live: t.work.live,
    frontend: t.work.frontend,
    backend: t.work.backend,
    repo: t.work.repo,
    org: t.work.org,
  }

  const paarRows = [
    { label: t.work.problem, text: project.paar.problem[lang] },
    { label: t.work.approach, text: project.paar.approach[lang] },
    { label: t.work.action, text: project.paar.action[lang] },
    { label: t.work.result, text: project.paar.result[lang], emphasis: true },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative grid gap-8 border-t border-paper/10 py-16 lg:grid-cols-[auto_1fr] lg:gap-14',
        project.muted ? 'opacity-80' : '',
      ].join(' ')}
    >
      {/* 좌측: 대형 인덱스 (데스크톱 sticky) */}
      <div className="lg:w-40">
        <div className="lg:sticky lg:top-28">
          <span
            className={[
              'font-display font-semibold leading-none tracking-tightest',
              project.muted ? 'text-5xl text-paper/20' : 'text-7xl text-stroke',
            ].join(' ')}
          >
            {project.index}
          </span>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            {project.period}
          </div>
          <div className="mt-1.5">
            <span className="inline-block rounded-full border border-paper/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-paper/50">
              {project.kind === 'team' ? t.work.team : t.work.solo}
            </span>
          </div>
        </div>
      </div>

      {/* 우측: 본문 */}
      <div className="min-w-0">
        <h3 className="font-display text-3xl font-semibold tracking-tightest sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 max-w-2xl break-keep text-lg leading-relaxed text-paper/70">
          {project.tagline[lang]}
        </p>

        {/* 핵심 수치 (가장 먼저, 크게) */}
        {project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="bg-ink px-4 py-5 text-center">
                <div className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1.5 break-keep text-[11px] leading-snug text-paper/45">
                  {m.label[lang]}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAAR */}
        <div className="mt-9 space-y-4">
          {paarRows.map((row, i) => (
            <div key={i} className="grid gap-1.5 sm:grid-cols-[88px_1fr] sm:gap-5">
              <div className="pt-0.5 text-[11px] uppercase tracking-[0.2em] text-paper/35">
                {row.label}
              </div>
              <p
                className={[
                  'break-keep leading-relaxed',
                  row.emphasis ? 'text-paper/90' : 'text-paper/65',
                ].join(' ')}
              >
                {row.text}
              </p>
            </div>
          ))}
        </div>

        {/* 메인: 동작 흐름 (가장 중요 — 크게) */}
        <div className="mt-10 rounded-2xl border border-paper/10 bg-paper/[0.02] p-6 sm:p-8">
          <SignalFlow flow={project.pipeline} kicker={t.work.pipeline} />
        </div>

        {/* 보조: 배포/인프라 (작게, demote) */}
        <div className="mt-4 rounded-2xl border border-paper/[0.07] bg-paper/[0.01] p-5 opacity-70 transition-opacity hover:opacity-100 sm:px-8">
          <SignalFlow flow={project.deploy} kicker={t.work.deploy} compact />
        </div>

        {/* 스택 */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-paper/10 px-2.5 py-1 font-mono text-[12px] text-paper/50"
            >
              {s}
            </span>
          ))}
        </div>

        {/* 링크 */}
        {project.links.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <LinkPill key={l.kind} link={l} label={linkLabel[l.kind]} />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
