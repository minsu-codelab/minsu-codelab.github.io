import { useState } from 'react'
import { skillIconSlug } from '../data/skills'

/**
 * Simple Icons CDN에서 단색(흰색) 아이콘을 불러온다. 모노톤 유지.
 * 슬러그가 없거나 로드 실패 시 작은 점으로 폴백.
 */
export default function TechIcon({ name }: { name: string }) {
  const slug = skillIconSlug[name]
  const [failed, setFailed] = useState(false)

  if (!slug || failed) {
    return <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-paper/50" />
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/d4d4d4`}
      alt=""
      aria-hidden
      loading="lazy"
      width={18}
      height={18}
      className="h-[18px] w-[18px] opacity-80 transition-opacity group-hover:opacity-100"
      onError={() => setFailed(true)}
    />
  )
}
