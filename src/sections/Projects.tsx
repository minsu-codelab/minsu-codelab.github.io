import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { useLang } from '../i18n/LanguageContext'
import { projects } from '../data/projects'

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading label={t.work.label} heading={t.work.heading} note={t.work.note} />

      <div className="mt-12">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} total={projects.length} />
        ))}
      </div>
    </section>
  )
}
