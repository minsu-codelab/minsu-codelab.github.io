import type { L10n } from '../i18n/LanguageContext'

export interface TimelineEntry {
  period: string
  title: L10n
  org: L10n
  desc: L10n
  kind: 'work' | 'edu'
}

// 최신순 정렬
export const timeline: TimelineEntry[] = [
  {
    period: '2025.12 ~ 2026.06',
    title: { ko: 'AI 웹서비스 풀스택 부트캠프', en: 'AI Web Full-Stack Bootcamp' },
    org: { ko: '코드랩 아카데미', en: 'Codelab Academy' },
    desc: {
      ko: 'AI 인공지능 웹서비스 풀스택 개발 과정. 7개 프로젝트를 기획·구현·배포까지 수행.',
      en: 'Intensive AI web full-stack program. Planned, built and deployed seven projects end-to-end.',
    },
    kind: 'edu',
  },
  {
    period: '2021.08 ~ 2025.10',
    title: { ko: '방화셔터 설계 · 건설 현장 시공 관리 (PM)', en: 'Fire-Shutter Design & Construction-Site Installation Manager (PM)' },
    org: { ko: '(주)주일기업', en: 'Juil Enterprise Co., Ltd.' },
    desc: {
      ko: '법정 방화 인정 제품을 설계하고, 건설 현장에서 방화셔터 설치를 관리하며 4년여를 수행. 방화셔터 도메인 지식의 토대.',
      en: 'Over four years designing legally approved fire-safety products and managing their installation on construction sites — the foundation of my fire-shutter domain knowledge.',
    },
    kind: 'work',
  },
  {
    period: '2015.03 ~ 2020.02',
    title: { ko: '전기과 졸업', en: 'B.Eng. Electrical Engineering' },
    org: { ko: '연성대학교', en: 'Yeonsung University' },
    desc: {
      ko: '전기 공학 전공. 시스템·제어에 대한 기초를 다짐.',
      en: 'Major in Electrical Engineering — groundwork in systems and control.',
    },
    kind: 'edu',
  },
]
