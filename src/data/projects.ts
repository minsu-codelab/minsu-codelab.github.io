import type { L10n } from '../i18n/LanguageContext'

export interface FlowNode {
  id: string
  label: L10n
  /** 0..1 위치 (가로 흐름 기준). 시각화에서 노드 배치에 사용 */
  emphasis?: boolean
}

export interface Flow {
  title: L10n
  nodes: FlowNode[]
}

export interface ProjectLink {
  kind: 'live' | 'frontend' | 'backend' | 'repo' | 'org'
  url: string
}

export interface Project {
  id: string
  index: string
  name: string
  tagline: L10n
  summary: L10n
  period: string
  kind: 'team' | 'solo'
  // 비중 축소 표시용 (EggTalk)
  muted?: boolean
  highlights: L10n[]
  stack: string[]
  links: ProjectLink[]
  // 데이터 파이프라인 흐름 (입력→처리→출력)
  pipeline: Flow
  // 배포/인프라(CI/CD) 흐름 — 프로젝트마다 다름
  deploy: Flow
}

export const projects: Project[] = [
  {
    id: 'arctictwin',
    index: '01',
    name: 'ArcticTwin',
    tagline: {
      ko: '북극항로 사업성·리스크 정량화 디지털 트윈',
      en: 'A digital twin quantifying Arctic-route profitability & risk',
    },
    summary: {
      ko: '위성·해빙·기상 공공데이터를 3D 디지털 트윈(Cesium)에 실시간 재현하고, 5종 AI로 북극항로의 수익성·리스크·항행 적합성을 정량 지표로 산출하는 의사결정 웹 서비스.',
      en: 'A decision-making web service that recreates satellite, sea-ice and weather public data in a 3D digital twin (Cesium), and uses 5 AI models to quantify the profitability, risk and navigability of Arctic routes.',
    },
    period: '2026.04 — 06',
    kind: 'team',
    highlights: [
      {
        ko: '강화학습(SAC) 빙산 회피·출항 스케줄링을 항로 3 × 빙급 7 × 선종 4 = 84개 조합으로 자동 반복학습 (보상함수 자동 조정 파이프라인)',
        en: 'Reinforcement learning (SAC) for ice avoidance & departure scheduling, auto-retrained across 3 routes × 7 ice classes × 4 ship types = 84 combinations (auto-tuning reward pipeline).',
      },
      {
        ko: 'AI 출력 신뢰성 보증: RL 경로를 정밀 해상마스크로 검증 후 위반 시 A* 폴백하는 하이브리드 구조로 비현실 경로(육지 관통) 제거',
        en: 'Trustworthy AI: RL paths verified against a precise sea mask, falling back to A* on violation — a hybrid that removes unrealistic (land-crossing) routes.',
      },
      {
        ko: '24/7 무중단 설계: PostgreSQL 우선 + JSON 스냅샷 자동 폴백·복구. CI/CD 디스크풀로 인한 전체 502 장애를 진단·해결',
        en: '24/7 uptime: PostgreSQL-first with automatic JSON-snapshot fallback & recovery. Diagnosed and fixed a full 502 outage caused by a CI/CD disk-full.',
      },
    ],
    stack: ['React', 'Vite', 'Cesium', 'deck.gl', 'FastAPI', 'PostgreSQL', 'SAC', 'XGBoost', 'YOLOv8', 'Docker', 'AWS EC2', 'Vercel'],
    links: [
      { kind: 'live', url: 'http://www.arctictwin.com' },
      { kind: 'frontend', url: 'https://github.com/youmin0523/Arctic_Twin_Frontend' },
      { kind: 'backend', url: 'https://github.com/youmin0523/Arctic_Twin_Backend' },
    ],
    pipeline: {
      title: { ko: '데이터 → 5종 AI → 정량 지표', en: 'Data → 5 AI models → metrics' },
      nodes: [
        { id: 'a1', label: { ko: '위성·해빙·기상 공공데이터', en: 'Satellite · sea-ice · weather data' } },
        { id: 'a2', label: { ko: 'Cesium 3D 트윈', en: 'Cesium 3D twin' } },
        { id: 'a3', label: { ko: 'SAC · XGBoost · YOLOv8 · LLM', en: 'SAC · XGBoost · YOLOv8 · LLM' }, emphasis: true },
        { id: 'a4', label: { ko: '해상마스크 검증 → A* 폴백', en: 'Sea-mask check → A* fallback' }, emphasis: true },
        { id: 'a5', label: { ko: '연료비 · ROI · 리스크', en: 'Fuel · ROI · risk' } },
      ],
    },
    deploy: {
      title: { ko: '배포 · 무중단 가용성', en: 'Deploy · high availability' },
      nodes: [
        { id: 'ad1', label: { ko: 'Docker', en: 'Docker' } },
        { id: 'ad2', label: { ko: 'AWS EC2 (백엔드)', en: 'AWS EC2 (backend)' } },
        { id: 'ad3', label: { ko: 'Vercel (프론트)', en: 'Vercel (frontend)' } },
        { id: 'ad4', label: { ko: 'PG → 스냅샷 폴백·자동복구', en: 'PG → snapshot fallback & recovery' }, emphasis: true },
      ],
    },
  },
  {
    id: 'aeroinspect',
    index: '02',
    name: 'AeroInspect',
    tagline: {
      ko: '드론 기반 건물 하자 점검 AI 플랫폼',
      en: 'Drone-based building-defect inspection AI platform',
    },
    summary: {
      ko: '드론 RGB·열화상 영상을 실시간 AI로 분석해 건축 하자를 자동 검출·3D 매핑하고 LLM 보고서까지 생성하는 점검 SaaS.',
      en: 'An inspection SaaS that analyzes drone RGB/thermal video in real time to auto-detect building defects, 3D-map them and generate LLM reports.',
    },
    period: '2026.04 — 06',
    kind: 'team',
    highlights: [
      {
        ko: '건축 하자 20여 종을 6개 전문 AI 모델로 분할 학습 (데이터 63,285장 직접 수집, 로컬 GPU + Colab 멀티계정 병행, 수십 회 재학습)',
        en: 'Trained 6 specialist AI models for 20+ defect types (63,285 images collected, local GPU + multi-account Colab, dozens of retrains).',
      },
      {
        ko: 'WebSocket 실시간 추론 파이프라인: 드롭 큐(maxsize=1)·계층적 추론으로 30fps↔100ms 격차 해소, Tier1 지연 <60ms',
        en: 'Real-time WebSocket inference: drop-queue (maxsize=1) + tiered inference closed the 30fps↔100ms gap, Tier-1 latency <60ms.',
      },
      {
        ko: 'WBF 앙상블 효과를 정량 실측해 외부 모델 추가를 데이터로 반박, self-ensemble로 recall +3.8%. 번들 70%↓·이미지 80MB→5.2MB',
        en: 'Measured WBF ensemble gains to refute "add more models" with data; self-ensemble lifted recall +3.8%. Bundle −70%, image 80MB→5.2MB.',
      },
    ],
    stack: ['React', 'Three.js', 'FastAPI', 'WebSocket', 'PostgreSQL', 'PyTorch', 'ONNX', 'YOLOv8', 'ResNet50', 'Docker', 'Fly.io', 'GCP'],
    links: [
      { kind: 'live', url: 'http://www.aeroinspect.site' },
      { kind: 'frontend', url: 'https://github.com/youmin0523/AeroInspect_frontend' },
      { kind: 'backend', url: 'https://github.com/youmin0523/AeroInspect_backend' },
    ],
    pipeline: {
      title: { ko: '드론 영상 → 실시간 추론 → 보고서', en: 'Drone video → real-time inference → report' },
      nodes: [
        { id: 'b1', label: { ko: '드론 영상 (30fps)', en: 'Drone video (30fps)' } },
        { id: 'b2', label: { ko: 'WebSocket 드롭 큐', en: 'WebSocket drop-queue' }, emphasis: true },
        { id: 'b3', label: { ko: '6모델 앙상블 (WBF)', en: '6-model ensemble (WBF)' }, emphasis: true },
        { id: 'b4', label: { ko: '3D 매핑 (R3F)', en: '3D mapping (R3F)' } },
        { id: 'b5', label: { ko: 'LLM 자동 보고서', en: 'LLM auto report' } },
      ],
    },
    deploy: {
      title: { ko: '배포 · GPU 비용 분리', en: 'Deploy · GPU cost split' },
      nodes: [
        { id: 'bd1', label: { ko: 'Docker (이미지 5.2MB)', en: 'Docker (5.2MB image)' } },
        { id: 'bd2', label: { ko: 'Fly.io (API 상시)', en: 'Fly.io (always-on API)' } },
        { id: 'bd3', label: { ko: 'GCP GPU VM (추론, 평소 OFF)', en: 'GCP GPU VM (inference, off by default)' }, emphasis: true },
      ],
    },
  },
  {
    id: 'rechord',
    index: '03',
    name: 'Re:Chord',
    tagline: {
      ko: 'AI 음원 분리 · 키/코드/악보 자동 추출 플랫폼',
      en: 'AI stem separation & key/chord/score extraction platform',
    },
    summary: {
      ko: '업로드 한 번으로 음원 분리 → 키 변환 → 코드·악보 채보를 자동화해, 팀 키에 맞는 반주(MR)를 단일 도구로 만드는 AI 음악 플랫폼.',
      en: 'An AI music platform that, from a single upload, automates stem separation → key transposition → chord/score transcription to produce backing tracks in your team’s key.',
    },
    period: '2026.05 — 06',
    kind: 'solo',
    highlights: [
      {
        ko: '단일 분리 모델의 한계를 4-model 앙상블(MDX23C·BS-Roformer·htdemucs·MelBand)로 극복 — 반주 SDR 15.06dB, AUX 음색 자동 추정 98.3% 실측',
        en: 'Overcame single-model limits with a 4-model ensemble (MDX23C, BS-Roformer, htdemucs, MelBand) — backing SDR 15.06 dB, AUX timbre estimation 98.3% (measured).',
      },
      {
        ko: '"품질은 주장이 아니라 측정" — SDR·F1 정확도 회귀 게이트를 CI에 박아 모든 퇴행을 자동 차단. pytest 220개 통과',
        en: '"Quality is measured, not claimed" — SDR/F1 regression gates in CI auto-block every regression. 220 pytest passing.',
      },
      {
        ko: 'FastAPI 백엔드(106 모듈·60 API) · React 프론트 · Docker·Supabase·Cloudflare 배포까지 기획부터 인프라까지 1인 구축',
        en: 'Built solo end-to-end: FastAPI backend (106 modules, 60 APIs), React frontend, and Docker/Supabase/Cloudflare deployment.',
      },
    ],
    stack: ['React', 'Vite', 'FastAPI', 'Python', 'PyTorch', 'Demucs', 'BS-Roformer', 'Whisper', 'Docker', 'Supabase', 'Cloudflare'],
    links: [
      { kind: 'live', url: 'http://www.youmin.site' },
      { kind: 'repo', url: 'https://github.com/youmin0523/Re-Chord_PJT' },
    ],
    pipeline: {
      title: { ko: '업로드 → 분리·채보 → MR', en: 'Upload → separate & transcribe → MR' },
      nodes: [
        { id: 'c1', label: { ko: '음원 업로드', en: 'Audio upload' } },
        { id: 'c2', label: { ko: '4모델 앙상블 분리', en: '4-model ensemble separation' }, emphasis: true },
        { id: 'c3', label: { ko: '키 변환', en: 'Key transpose' } },
        { id: 'c4', label: { ko: 'Whisper · LLM 채보', en: 'Whisper · LLM transcription' } },
        { id: 'c5', label: { ko: 'MR · 코드 · 악보', en: 'MR · chords · score' } },
      ],
    },
    deploy: {
      title: { ko: 'CI 정확도 회귀 게이트', en: 'CI accuracy regression gate' },
      nodes: [
        { id: 'cd1', label: { ko: 'git push', en: 'git push' } },
        { id: 'cd2', label: { ko: 'pytest 220 + SDR/F1 게이트', en: 'pytest 220 + SDR/F1 gate' }, emphasis: true },
        { id: 'cd3', label: { ko: 'Docker', en: 'Docker' } },
        { id: 'cd4', label: { ko: 'Supabase · Cloudflare', en: 'Supabase · Cloudflare' } },
      ],
    },
  },
  {
    id: 'fde-shutter',
    index: '04',
    name: 'FDE Smart Shutter',
    tagline: {
      ko: '방화셔터 견적·생산 자동화 스마트팩토리',
      en: 'Fire-shutter estimation & production smart factory',
    },
    summary: {
      ko: '방화셔터 7개 모델의 제작 규칙을 규칙 엔진으로 코드화하고, 견적→생산→검사 추적성과 MES·ERP·실시간 협업까지 구현한 스마트팩토리 플랫폼. (가장 깊은 도메인 경험)',
      en: 'A smart-factory platform that codifies the manufacturing rules of 7 fire-shutter models into a rule engine, with quote→production→inspection traceability plus MES, ERP and real-time collaboration. (My deepest domain.)',
    },
    period: '2026.05 — 06',
    kind: 'solo',
    highlights: [
      {
        ko: '7개 모델 제작 규칙을 규칙 엔진으로 코드화 — 숙련자만 가능하던 견적을 비숙련자도 산출, 골든 회귀 테스트 36건 100% 통과',
        en: 'Codified 7 models’ manufacturing rules into a rule engine — anyone can now produce quotes once limited to experts; 36 golden regression tests pass 100%.',
      },
      {
        ko: '견적→발주→승인→품질→작업지시→실측을 잇는 추적성(digital thread) + JWT 4역할 RBAC·무충돌 채번·원본 엑셀 양식 100% 보존 출력',
        en: 'A digital thread linking quote→order→approval→QC→work-order→measurement, with JWT 4-role RBAC, conflict-free numbering and 100%-preserved Excel templates.',
      },
      {
        ko: 'Docker·GitHub Actions로 Fly.io 자동 배포·운영. 환경 의존 버그(LibreOffice PDF 크래시·채번 동시성 충돌) 재현·해결. BE 16,000줄·DB 27테이블·API 23종',
        en: 'Auto-deployed & operated on Fly.io via Docker/GitHub Actions; reproduced & fixed env-only bugs (LibreOffice PDF crash, numbering race). 16K LOC backend, 27 tables, 23 APIs.',
      },
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'React', 'WebSocket', 'Docker', 'PostgreSQL', 'Fly.io', 'GitHub Actions'],
    links: [
      { kind: 'live', url: 'https://fde-shutter.fly.dev/' },
      { kind: 'org', url: 'https://github.com/fde-factory' },
    ],
    pipeline: {
      title: { ko: '디지털 스레드 (견적 → 실측)', en: 'Digital thread (quote → measurement)' },
      nodes: [
        { id: 'd1', label: { ko: '견적 (규칙 엔진)', en: 'Quote (rule engine)' }, emphasis: true },
        { id: 'd2', label: { ko: '발주 (LOT)', en: 'Order (LOT)' } },
        { id: 'd3', label: { ko: '승인', en: 'Approval' } },
        { id: 'd4', label: { ko: '품질', en: 'QC' } },
        { id: 'd5', label: { ko: '작업지시', en: 'Work order' } },
        { id: 'd6', label: { ko: '실측', en: 'Measurement' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD 자동 배포', en: 'CI/CD auto deploy' },
      nodes: [
        { id: 'dd1', label: { ko: 'git push', en: 'git push' } },
        { id: 'dd2', label: { ko: 'GitHub Actions (테스트·골든·alembic)', en: 'GitHub Actions (test·golden·alembic)' }, emphasis: true },
        { id: 'dd3', label: { ko: 'Docker 빌드', en: 'Docker build' } },
        { id: 'dd4', label: { ko: 'Fly.io 자동 배포', en: 'Fly.io auto deploy' } },
      ],
    },
  },
  {
    id: 'closet',
    index: '05',
    name: "What's in my Closet",
    tagline: {
      ko: 'AI 의류 인벤토리 · 중복구매 방지 플랫폼',
      en: 'AI wardrobe inventory & duplicate-purchase prevention',
    },
    summary: {
      ko: '임베딩·색상거리·카테고리를 가중 합성한 유사도 엔진으로 "비슷한 옷"을 사전 경고해 중복 구매를 막는 AI 의류 관리 플랫폼.',
      en: 'An AI wardrobe platform that warns about "similar clothes you already own" — preventing duplicate purchases via a weighted similarity engine over embeddings, color distance and category.',
    },
    period: '2026.06',
    kind: 'solo',
    highlights: [
      {
        ko: '임베딩(코사인) + 색상거리(CIEDE2000) + 카테고리 가중 합성 멀티신호 유사도 엔진 — 임계값 캘리브레이션 하네스로 밴드 정확도 94.7%·오경보 0',
        en: 'A multi-signal similarity engine (cosine embedding + CIEDE2000 color + category weighting) — threshold-calibration harness achieved 94.7% band accuracy, 0 false alarms.',
      },
      {
        ko: 'PostgreSQL 16 + pgvector(HNSW) 코사인 검색으로 별도 벡터 DB 없이 유사 의류 top-K 검색, L2 정규화로 코사인=내적 통일',
        en: 'pgvector (HNSW) cosine search on PostgreSQL 16 — top-K similar-item search with no separate vector DB; L2 normalization unifies cosine with inner product.',
      },
      {
        ko: '외부 서비스 5종을 env 게이팅 + 결정적 폴백으로 추상화 → API 키 0개로 전 기능 동작·E2E. Vitest 97 · Playwright 12 · GitHub Actions CI',
        en: 'Abstracted 5 external services behind env-gating + deterministic fallbacks → full pipeline runs with zero API keys. Vitest 97, Playwright 12, GitHub Actions CI.',
      },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'tRPC', 'Drizzle', 'PostgreSQL', 'pgvector', 'Auth.js', 'Playwright', 'Vitest'],
    links: [{ kind: 'repo', url: 'https://github.com/youmin0523/whats-in-my-closet' }],
    pipeline: {
      title: { ko: '업로드 → 유사도 → 사전 경고', en: 'Upload → similarity → pre-warning' },
      nodes: [
        { id: 'e1', label: { ko: '의류 이미지 업로드', en: 'Garment image upload' } },
        { id: 'e2', label: { ko: '임베딩 + CIEDE2000 + 카테고리', en: 'Embedding + CIEDE2000 + category' }, emphasis: true },
        { id: 'e3', label: { ko: 'pgvector HNSW 검색', en: 'pgvector HNSW search' }, emphasis: true },
        { id: 'e4', label: { ko: '"비슷한 옷" 경고', en: '"Similar item" warning' } },
      ],
    },
    deploy: {
      title: { ko: '키 0개 동작 + E2E 게이트', en: 'Zero-key operation + E2E gate' },
      nodes: [
        { id: 'ed1', label: { ko: 'env 게이팅 + 결정적 폴백', en: 'env-gating + deterministic fallback' }, emphasis: true },
        { id: 'ed2', label: { ko: 'Vitest 97 · Playwright 12', en: 'Vitest 97 · Playwright 12' } },
        { id: 'ed3', label: { ko: 'GitHub Actions CI', en: 'GitHub Actions CI' } },
      ],
    },
  },
  {
    id: 'eggtalk',
    index: '06',
    name: 'EggTalk',
    muted: true,
    tagline: {
      ko: '다마고치 펫 플랫폼 — 대중교통 길찾기 모듈(MS)',
      en: 'Tamagotchi pet platform — transit-routing module (MS)',
    },
    summary: {
      ko: '팀 프로젝트 중 단독 담당한 대중교통 길찾기 모듈. 이후 팀 리뉴얼로 대부분 대체되었으나, 지도 API·ODsay 기반 폴리라인 경로 렌더링은 직접 구현한 작업으로 기록해 둡니다.',
      en: 'A transit-routing module I solely owned within a team project. Most of it was later replaced in a team renewal, but the map-API / ODsay polyline route rendering remains my own work, kept here for the record.',
    },
    period: '2026.02 — 03',
    kind: 'team',
    highlights: [
      {
        ko: 'ODsay `searchPubTransPathT`·`loadLane` + Tmap 도보 API를 백엔드에서 프록시·가공해 지하철·버스·도보 통합 경로를 지도 폴리라인으로 렌더링',
        en: 'Proxied/processed ODsay (searchPubTransPathT, loadLane) + Tmap walking APIs on the backend to render integrated subway/bus/walk routes as map polylines.',
      },
      {
        ko: '외부 API 일 1,000건 한도 방어: Token Bucket Rate Limiter + 24h 응답 캐시 + 프론트 Throttle 3중 설계 (참고용)',
        en: 'Defended the 1,000/day external-API limit with a 3-layer design: Token-Bucket rate limiter + 24h cache + front-end throttle (for reference).',
      },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Kakao Maps SDK', 'ODsay API', 'Tmap API'],
    links: [],
    pipeline: {
      title: { ko: '출발/도착 → ODsay → 폴리라인', en: 'Origin/dest → ODsay → polyline' },
      nodes: [
        { id: 'f1', label: { ko: '출발 · 도착', en: 'Origin · destination' } },
        { id: 'f2', label: { ko: 'ODsay · Tmap API', en: 'ODsay · Tmap API' } },
        { id: 'f3', label: { ko: '지도 폴리라인 렌더링', en: 'Map polyline rendering' }, emphasis: true },
      ],
    },
    deploy: {
      title: { ko: '비용 방어 3중 설계', en: '3-layer cost defense' },
      nodes: [
        { id: 'fd1', label: { ko: 'Token Bucket', en: 'Token Bucket' } },
        { id: 'fd2', label: { ko: '24h 캐시', en: '24h cache' } },
        { id: 'fd3', label: { ko: '프론트 Throttle', en: 'Front throttle' } },
      ],
    },
  },
]
