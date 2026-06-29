import type { L10n } from '../i18n/LanguageContext'

export interface SkillCategory {
  key: string
  label: L10n
  items: string[]
}

// 이력서 "보유기술" 기준 5개 카테고리
export const skills: SkillCategory[] = [
  {
    key: 'language',
    label: { ko: '언어', en: 'Language' },
    items: ['Python', 'JavaScript', 'TypeScript'],
  },
  {
    key: 'frontend',
    label: { ko: '프론트엔드', en: 'Frontend' },
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Three.js', 'Cesium', 'deck.gl'],
  },
  {
    key: 'backend',
    label: { ko: '백엔드 · 서버', en: 'Backend · Server' },
    items: ['FastAPI', 'Node.js', 'tRPC', 'WebSocket', 'SQLAlchemy', 'Drizzle', 'Typer', 'Rich', 'SSE'],
  },
  {
    key: 'database',
    label: { ko: '데이터베이스', en: 'Database' },
    items: ['PostgreSQL', 'pgvector', 'Supabase', 'Alembic'],
  },
  {
    key: 'devops',
    label: { ko: 'DevOps · 인프라', en: 'DevOps · Infra' },
    items: ['Docker', 'GitHub Actions', 'Fly.io', 'Vercel', 'AWS EC2', 'GCP', 'Cloudflare', 'uv', 'WSL2', 'mypy', 'ruff', 'pytest'],
  },
  {
    key: 'ai-llm',
    label: { ko: 'AI · LLM', en: 'AI · LLM' },
    items: ['Claude (Claude Code)', 'Gemini', 'llama.cpp', 'LM Studio', 'Qwen-Coder', 'RAG', 'sqlite-vec', 'FastEmbed', 'MCP', 'Pydantic-AI', 'QLoRA', 'Unsloth', 'bitsandbytes'],
  },
  {
    key: 'ml-dl',
    label: { ko: 'ML · DL', en: 'ML · DL' },
    items: ['PyTorch', 'ONNX', 'YOLOv8', 'ResNet50', 'XGBoost', 'SAC (RL)', 'Whisper', 'Demucs'],
  },
]

// 모노톤 아이콘: Simple Icons slug 매핑 (currentColor 단색). 없으면 텍스트 칩 폴백.
export const skillIconSlug: Record<string, string> = {
  Python: 'python',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  React: 'react',
  'Next.js': 'nextdotjs',
  Vite: 'vite',
  'Tailwind CSS': 'tailwindcss',
  'Three.js': 'threedotjs',
  Cesium: 'cesium',
  'deck.gl': 'deckgl',
  FastAPI: 'fastapi',
  'Node.js': 'nodedotjs',
  tRPC: 'trpc',
  SQLAlchemy: 'sqlalchemy',
  Drizzle: 'drizzle',
  PostgreSQL: 'postgresql',
  pgvector: 'postgresql',
  Supabase: 'supabase',
  Docker: 'docker',
  'GitHub Actions': 'githubactions',
  'Fly.io': 'flydotio',
  Vercel: 'vercel',
  'AWS EC2': 'amazonec2',
  GCP: 'googlecloud',
  Cloudflare: 'cloudflare',
}
