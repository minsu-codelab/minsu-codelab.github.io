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

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative grid gap-8 border-t border-paper/10 py-16 lg:grid-cols-[auto_1fr] lg:gap-14',
        project.muted ? 'opacity-70' : '',
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
          <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            <span>{project.period}</span>
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
        <p className="mt-2 text-base text-paper/55">{project.tagline[lang]}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-paper/75">{project.summary[lang]}</p>

        {/* 핵심 성과 */}
        <ul className="mt-6 space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-paper/70">
              <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-paper/50" />
              {h[lang]}
            </li>
          ))}
        </ul>

        {/* 시그널 플로우 2종 */}
        {!project.muted ? (
          <div className="mt-10 grid gap-10 rounded-2xl border border-paper/10 bg-paper/[0.02] p-6 sm:p-8 lg:grid-cols-2">
            <SignalFlow flow={project.pipeline} kicker={t.work.pipeline} />
            <SignalFlow flow={project.deploy} kicker={t.work.deploy} />
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-paper/10 bg-paper/[0.02] p-6 sm:p-8">
            <SignalFlow flow={project.pipeline} kicker={t.work.pipeline} />
          </div>
        )}

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
