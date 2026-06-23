import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  heading: string
  note?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  label,
  heading,
  note,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className={[
          'flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-paper/40',
          align === 'center' ? 'justify-center' : '',
        ].join(' ')}
      >
        <span className="inline-block h-px w-8 bg-paper/40" />
        {label}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-5 whitespace-pre-line font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl"
      >
        {heading}
      </motion.h2>

      {note && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={[
            'mt-5 max-w-xl text-base text-paper/55',
            align === 'center' ? 'mx-auto' : '',
          ].join(' ')}
        >
          {note}
        </motion.p>
      )}
    </div>
  )
}
