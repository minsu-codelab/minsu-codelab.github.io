import type { L10n } from '../i18n/LanguageContext'

export interface FlowNode {
  id: string
  label: L10n
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

/** 한눈에 보이는 핵심 수치 (큰 숫자 + 짧은 설명) */
export interface Metric {
  value: string
  label: L10n
}

/** PAAR: Problem · Approach · Action · Result */
export interface Paar {
  problem: L10n
  approach: L10n
  action: L10n
  result: L10n
}

/** 실제 UI 스크린샷 (public/shots/ 기준 경로) */
export interface Shot {
  src: string
  caption: L10n
}

export interface Project {
  id: string
  index: string
  name: string
  tagline: L10n
  period: string
  kind: 'team' | 'solo'
  muted?: boolean
  metrics: Metric[]
  paar: Paar
  stack: string[]
  links: ProjectLink[]
  pipeline: Flow
  deploy: Flow
  shots?: Shot[]
}

export const projects: Project[] = [
  {
    id: 'arctictwin',
    index: '01',
    name: 'ArcticTwin',
    tagline: {
      ko: '북극항로의 수익성과 리스크를 숫자로 답하는 디지털 트윈',
      en: 'A digital twin that answers Arctic-route profit and risk with numbers',
    },
    period: '2026.04 ~ 06',
    kind: 'team',
    metrics: [
      { value: '40%', label: { ko: '수에즈 대비 거리 단축', en: 'shorter than the Suez route' } },
      { value: '84', label: { ko: '항로×빙급×선종 자동 학습 조합', en: 'auto-trained route × ice × ship combos' } },
      { value: '100%', label: { ko: '출항 스케줄 안전 성공률(검증 조합)', en: 'safe-departure success (verified set)' } },
      { value: '24/7', label: { ko: '무중단 운영', en: 'uninterrupted uptime' } },
    ],
    paar: {
      problem: {
        ko: '북극항로는 수에즈보다 거리가 40% 짧지만, 지금 이 배로 가는 게 정말 이득인지 숫자로 따져볼 도구가 없었습니다.',
        en: 'The Arctic route is 40% shorter than Suez, yet there was no tool to actually judge — in numbers — whether a given ship should take it.',
      },
      approach: {
        ko: '가능성을 말로 설명하는 대신 연료비·리스크·항행 적합성을 실측 지표로 뽑아내야 설득이 된다고 봤습니다.',
        en: 'I decided that talking about "potential" convinces no one — the answer had to come out as fuel cost, risk, and navigability figures.',
      },
      action: {
        ko: '위성·해빙·기상 공공데이터를 Cesium 3D 트윈에 얹고 빙산 회피(SAC 강화학습)·연료 예측(XGBoost)·SAR 빙산 탐지(YOLOv8)·What-If LLM을 붙였습니다. 강화학습은 항로·빙급·선종 84개 조합을 알아서 반복 학습하도록 파이프라인을 짰습니다.',
        en: 'I layered satellite, sea-ice and weather data onto a Cesium 3D twin, then added ice avoidance (SAC RL), fuel prediction (XGBoost), SAR iceberg detection (YOLOv8) and a What-If LLM. The RL retrains itself across 84 route × ice-class × ship-type combinations.',
      },
      result: {
        ko: '출항 스케줄링은 검증한 조합 전부에서 안전 성공률 100%가 나왔고, RL이 그린 경로는 해상 마스크로 검증해 이상하면 A*로 되돌렸습니다. 디스크 풀로 서비스 전체가 502로 죽던 장애도 직접 추적해 잡고 24/7로 돌렸습니다.',
        en: 'Departure scheduling hit a 100% safe-success rate across every verified combination, and every RL path was checked against a sea mask — falling back to A* when it strayed onto land. I also traced and fixed a disk-full outage that had been taking the whole service down with 502s, then kept it running 24/7.',
      },
    },
    stack: ['React', 'Vite', 'Cesium', 'deck.gl', 'FastAPI', 'PostgreSQL', 'SAC', 'XGBoost', 'YOLOv8', 'Docker', 'AWS EC2', 'Vercel'],
    links: [
      { kind: 'live', url: 'http://www.arctictwin.com' },
      { kind: 'frontend', url: 'https://github.com/youmin0523/Arctic_Twin_Frontend' },
      { kind: 'backend', url: 'https://github.com/youmin0523/Arctic_Twin_Backend' },
    ],
    pipeline: {
      title: { ko: '공공데이터에서 의사결정 지표까지', en: 'From public data to a decision' },
      nodes: [
        { id: 'a1', label: { ko: '위성·해빙·기상 데이터', en: 'Satellite · ice · weather' } },
        { id: 'a2', label: { ko: 'Cesium 3D 트윈', en: 'Cesium 3D twin' } },
        { id: 'a3', label: { ko: 'AI 4종 (RL·XGBoost·YOLO·LLM)', en: '4 AI models' }, emphasis: true },
        { id: 'a4', label: { ko: '경로 검증 → A* 폴백', en: 'Path check → A* fallback' }, emphasis: true },
        { id: 'a5', label: { ko: '연료비 · ROI · 리스크', en: 'Fuel · ROI · risk' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD · 무중단 배포', en: 'CI/CD · zero-downtime deploy' },
      nodes: [
        { id: 'ad1', label: { ko: 'git push', en: 'git push' } },
        { id: 'ad2', label: { ko: 'Docker 빌드 (AWS EC2)', en: 'Docker build (AWS EC2)' } },
        { id: 'ad3', label: { ko: '이미지 prune · 배치 푸시 · 재시작', en: 'image prune · batched push · restart' }, emphasis: true },
        { id: 'ad4', label: { ko: 'Vercel (프론트 자동배포)', en: 'Vercel (front auto-deploy)' } },
        { id: 'ad5', label: { ko: 'PostgreSQL → JSON 스냅샷 폴백', en: 'PostgreSQL → JSON snapshot fallback' }, emphasis: true },
      ],
    },
    shots: [
      { src: 'shots/arctictwin-1.jpg', caption: { ko: '① Cesium 3D 디지털 트윈: 항로·해빙·실시간 선박 대시보드', en: '① Cesium 3D digital twin — route, sea-ice & live vessel dashboard' } },
      { src: 'shots/arctictwin-2.jpg', caption: { ko: '② 위성 지도 위 항로 시각화와 분석 패널', en: '② Route visualization & analysis panels over the satellite map' } },
      { src: 'shots/arctictwin-3.jpg', caption: { ko: '③ Fuel Analysis: 연료 소비·비용 분석', en: '③ Fuel Analysis — consumption & cost' } },
      { src: 'shots/arctictwin-4.jpg', caption: { ko: '④ What-If 시나리오: 조건별 항행 비교', en: '④ What-If scenarios — comparing voyage conditions' } },
      { src: 'shots/arctictwin-5.jpg', caption: { ko: '⑤ Trend Report: 항로 리포트 생성', en: '⑤ Trend Report — voyage report generation' } },
      { src: 'shots/arctictwin-6.jpg', caption: { ko: '⑥ 생성된 PDF 보고서: 10p 표·차트 (북극 항로 AI 동향 보고서)', en: '⑥ Generated PDF report — 10-page tables & charts' } },
    ],
  },
  {
    id: 'aeroinspect',
    index: '02',
    name: 'AeroInspect',
    tagline: {
      ko: '드론으로 찍고 AI가 찾아내는 건물 하자 점검 SaaS',
      en: 'Drone footage in, building defects out — an inspection SaaS',
    },
    period: '2026.04 ~ 06',
    kind: 'team',
    metrics: [
      { value: '63,285', label: { ko: '직접 모은 학습 이미지', en: 'images collected & trained on' } },
      { value: '94.1%', label: { ko: 'M1 검출 recall (앙상블, +3.8%p)', en: 'M1 detection recall (ensemble, +3.8pp)' } },
      { value: '<60ms', label: { ko: '실시간 추론 지연 (Tier1)', en: 'real-time inference (Tier 1)' } },
      { value: '80→5.2MB', label: { ko: '빌드 이미지 경량화', en: 'build image slimmed down' } },
    ],
    paar: {
      problem: {
        ko: '건물 하자 점검은 사람 눈에 의존해서, 손이 안 닿는 외벽은 빠지고 결과가 검사자마다 달랐습니다.',
        en: 'Building inspection leaned on the human eye — hard-to-reach façades got skipped and results varied person to person.',
      },
      approach: {
        ko: '공개 모델로는 한국 건축 하자가 잘 안 잡혔습니다. 데이터를 직접 모아 학습하는 수밖에 없다고 판단했습니다.',
        en: 'Off-the-shelf models missed Korean construction defects, so I concluded I had to gather data and train the models myself.',
      },
      action: {
        ko: '하자 20여 종을 6개 모델로 나눠 학습했고(직접 모은 63,285장), 실시간 추론은 최신 프레임만 처리하는 드롭 큐로 묶었습니다. "외부 모델을 더 붙이면 좋아지겠지"라는 기대는 WBF로 직접 재서 깼습니다.',
        en: 'I split 20+ defect types across 6 models (63,285 images, collected by hand) and wrapped real-time inference in a drop-queue that only processes the latest frame. The assumption that "more external models = better" I tested with WBF — and disproved.',
      },
      result: {
        ko: '같은 도메인 self-ensemble로 M1 검출 recall을 90.4%에서 94.1%로 올렸고, 외부 모델은 오탐만 늘어 쓰지 않았습니다. Tier1 추론은 60ms 안쪽, 빌드 이미지는 80MB에서 5.2MB로 줄였습니다.',
        en: 'Same-domain self-ensemble lifted M1 detection recall from 90.4% to 94.1%; the external model only added false positives, so I dropped it. Tier-1 inference stays under 60ms, and the build image went from 80MB to 5.2MB.',
      },
    },
    stack: ['React', 'Three.js', 'FastAPI', 'WebSocket', 'PostgreSQL', 'PyTorch', 'ONNX', 'YOLOv8', 'ResNet50', 'Docker', 'Fly.io', 'GCP'],
    links: [
      { kind: 'live', url: 'http://www.aeroinspect.site' },
      { kind: 'frontend', url: 'https://github.com/youmin0523/AeroInspect_frontend' },
      { kind: 'backend', url: 'https://github.com/youmin0523/AeroInspect_backend' },
    ],
    pipeline: {
      title: { ko: '드론 영상에서 보고서까지', en: 'From drone video to a report' },
      nodes: [
        { id: 'b1', label: { ko: '드론 영상 (30fps)', en: 'Drone video (30fps)' } },
        { id: 'b2', label: { ko: '드롭 큐 (최신 프레임)', en: 'Drop-queue (latest frame)' }, emphasis: true },
        { id: 'b3', label: { ko: '6모델 앙상블 검출', en: '6-model ensemble' }, emphasis: true },
        { id: 'b4', label: { ko: '3D 하자 매핑', en: '3D defect mapping' } },
        { id: 'b5', label: { ko: 'LLM 자동 보고서', en: 'LLM auto report' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD · GPU 분리 배포', en: 'CI/CD · GPU-split deploy' },
      nodes: [
        { id: 'bd1', label: { ko: 'git push', en: 'git push' } },
        { id: 'bd2', label: { ko: 'GitHub Actions (flyctl deploy)', en: 'GitHub Actions (flyctl deploy)' }, emphasis: true },
        { id: 'bd3', label: { ko: 'Fly.io (API 상시)', en: 'Fly.io (always-on API)' } },
        { id: 'bd4', label: { ko: 'Vercel (프론트)', en: 'Vercel (front)' } },
        { id: 'bd5', label: { ko: 'GCP GPU VM (추론 · 온디맨드)', en: 'GCP GPU VM (inference · on-demand)' }, emphasis: true },
        { id: 'bd6', label: { ko: 'GCS (학습 모델 가중치)', en: 'GCS (model weights)' } },
      ],
    },
    shots: [
      { src: 'shots/aeroinspect-2.jpg', caption: { ko: '① 랜딩: 도면 없이 드론으로 3D 디지털 트윈 완성', en: '① Landing — drone-built 3D digital twin, no blueprint' } },
      { src: 'shots/aeroinspect-1.jpg', caption: { ko: '② 직원 허브: 점검 시작·보고서·현장 관리', en: '② Employee hub — inspection, reports & site management' } },
      { src: 'shots/aeroinspect-7.jpg', caption: { ko: '③ 실시간 하자 검출: 영상 위 bbox + AI 하자 분석 패널', en: '③ Real-time defect detection — live bbox + AI analysis panel' } },
      { src: 'shots/aeroinspect-3.jpg', caption: { ko: '④ 3D 하자 리포트 뷰어: 건물 트윈 위 하자 위치 매핑', en: '④ 3D defect report — defects mapped onto the building twin' } },
      { src: 'shots/aeroinspect-4.jpg', caption: { ko: '⑤ 3D 리포트: 하자 상세·평면 데이터 뷰어', en: '⑤ 3D report — defect detail & floor-plan viewer' } },
    ],
  },
  {
    id: 'rechord',
    index: '03',
    name: 'Re:Chord',
    tagline: {
      ko: '업로드 한 번으로 반주·키·코드·악보까지 뽑는 음악 도구',
      en: 'One upload → backing track, key, chords and score',
    },
    period: '2026.05 ~ 06',
    kind: 'solo',
    metrics: [
      { value: '15.06dB', label: { ko: '반주 분리 SDR (실측)', en: 'backing-track SDR (measured)' } },
      { value: '98.3%', label: { ko: '악기 음색 자동 추정', en: 'instrument-timbre estimation' } },
      { value: '220', label: { ko: 'pytest 통과 (CI 게이트)', en: 'pytest passing (CI gate)' } },
      { value: '1인', label: { ko: '기획부터 인프라까지', en: 'solo — plan to infra' } },
    ],
    paar: {
      problem: {
        ko: '찬양팀은 매주 새 곡을 연습하는데, 팀 키에 맞는 반주(MR)는 구하기 어렵고 음원 분리·키 변환·채보가 전부 따로 놀았습니다.',
        en: 'Worship teams rehearse new songs weekly, but backing tracks in their key are hard to find, and separation, transposition and transcription were all separate chores.',
      },
      approach: {
        ko: '분리 품질이 무너지면 그 위에 얹는 코드와 악보가 전부 틀어집니다. 그래서 분리부터 측정 가능한 수치로 잡기로 했습니다.',
        en: 'If separation quality breaks, every chord and score on top of it breaks too — so I started by pinning separation to measurable numbers.',
      },
      action: {
        ko: '업로드 한 번이면 분리 → 키 변환 → 채보까지 끝나도록 묶고, 분리는 모델 4개를 앙상블로 돌렸습니다. "품질은 주장이 아니라 측정"이라는 원칙으로 SDR·F1 회귀 게이트를 CI에 박았습니다.',
        en: 'I chained separation → transposition → transcription behind a single upload, and ran four models as an ensemble for the split. Living by "quality is measured, not claimed," I baked SDR/F1 regression gates into CI.',
      },
      result: {
        ko: '반주 분리 SDR 15.06dB, 음색 추정 98.3%를 실측으로 확보했고, pytest 220개가 모든 퇴행을 자동으로 막습니다. 결제·도메인 연결만 남기고 출시 직전까지 혼자 만들었습니다.',
        en: 'I measured 15.06 dB backing-track SDR and 98.3% timbre estimation, with 220 pytest cases auto-blocking any regression. I built it solo to the edge of launch — only payments and the domain were left.',
      },
    },
    stack: ['React', 'Vite', 'FastAPI', 'Python', 'PyTorch', 'Demucs', 'BS-Roformer', 'Whisper', 'Docker', 'Supabase', 'Cloudflare'],
    links: [
      { kind: 'live', url: 'http://www.youmin.site' },
      { kind: 'repo', url: 'https://github.com/youmin0523/Re-Chord_PJT' },
    ],
    pipeline: {
      title: { ko: '업로드에서 반주까지', en: 'From upload to backing track' },
      nodes: [
        { id: 'c1', label: { ko: '음원 업로드', en: 'Audio upload' } },
        { id: 'c2', label: { ko: '4모델 앙상블 분리', en: '4-model ensemble split' }, emphasis: true },
        { id: 'c3', label: { ko: '키 변환', en: 'Key transpose' } },
        { id: 'c4', label: { ko: 'Whisper·LLM 채보', en: 'Whisper · LLM transcribe' } },
        { id: 'c5', label: { ko: '반주·코드·악보', en: 'Track · chords · score' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD · 정확도 회귀 게이트', en: 'CI/CD · accuracy gate' },
      nodes: [
        { id: 'cd1', label: { ko: 'git push', en: 'git push' } },
        { id: 'cd2', label: { ko: 'GitHub Actions: ruff · pytest', en: 'GitHub Actions: ruff · pytest' }, emphasis: true },
        { id: 'cd3', label: { ko: '정확도 회귀 게이트 (SDR · F1)', en: 'accuracy gate (SDR · F1)' }, emphasis: true },
        { id: 'cd4', label: { ko: 'Docker', en: 'Docker' } },
        { id: 'cd5', label: { ko: 'Cloudflare + Supabase', en: 'Cloudflare + Supabase' } },
      ],
    },
    shots: [
      { src: 'shots/rechord-1.jpg', caption: { ko: '① 랜딩: 듣는 음악에서 직접 연주하는 음악으로', en: '① Landing — from listening to playing' } },
      { src: 'shots/rechord-2.jpg', caption: { ko: '② 기능 소개: 분리·키 변환·채보 흐름', en: '② Features — separation, transposition, transcription' } },
      { src: 'shots/rechord-4.jpg', caption: { ko: '③ 변환 작업: 음원 가져오기 + 모드 선택(Quick MR·Karaoke·Stems·Pro)', en: '③ Convert — import audio + pick a mode (Quick MR · Karaoke · Stems · Pro)' } },
      { src: 'shots/rechord-3.jpg', caption: { ko: '④ 작업 화면 / 라이브러리', en: '④ Workspace / library' } },
    ],
  },
  {
    id: 'fde-shutter',
    index: '04',
    name: 'FDE Smart Shutter',
    tagline: {
      ko: '엑셀 수작업 견적을 규칙 엔진으로 옮긴 방화셔터 스마트팩토리',
      en: 'A fire-shutter smart factory that turned Excel quoting into a rule engine',
    },
    period: '2026.05 ~ 06',
    kind: 'solo',
    metrics: [
      { value: '16,000', label: { ko: '백엔드 코드 줄 (1인)', en: 'lines of backend, solo' } },
      { value: '27', label: { ko: 'DB 테이블', en: 'DB tables' } },
      { value: '23', label: { ko: 'API 라우터', en: 'API routers' } },
      { value: '36/36', label: { ko: '골든 회귀 테스트 통과', en: 'golden regression tests pass' } },
    ],
    paar: {
      problem: {
        ko: '방화셔터는 모델마다 제작 규칙이 까다로워 숙련자만 엑셀로 견적을 냈고, 견적부터 검사까지 이력이 전혀 남지 않았습니다.',
        en: 'Each fire-shutter model had finicky build rules, so only veterans could quote in Excel — and nothing was traceable from quote to inspection.',
      },
      approach: {
        ko: '숙련자 머릿속 규칙을 코드로 옮기되, 거래처와 인증기관이 믿고 보는 원본 엑셀 양식은 100% 그대로 살려야 했습니다.',
        en: 'I had to move the veterans’ rules into code while keeping the original Excel forms — the ones clients and certifiers trust — 100% intact.',
      },
      action: {
        ko: '7개 모델 제작 규칙을 규칙 엔진으로 코드화하고, 견적→발주→승인→품질→작업지시→실측을 하나로 잇는 추적 구조에 실시간 사내 메신저까지 붙였습니다. (제가 4년간 일한 도메인이라 규칙이 손에 익었습니다.)',
        en: 'I codified 7 models’ rules into a rule engine and built a single traceable thread from quote → order → approval → QC → work-order → measurement, plus a real-time in-house messenger. (This was my own domain for four years, so the rules were second nature.)',
      },
      result: {
        ko: '이제 비숙련자도 견적을 낼 수 있고, 핵심 계산은 골든 테스트 36건으로 묶어 두었습니다. 백엔드 16,000줄·27테이블·23 API를 혼자 만들어 Fly.io에 올려 운영 중입니다.',
        en: 'Now non-experts can produce quotes, and the core calculations are locked behind 36 golden tests. I built the 16,000-line backend, 27 tables and 23 APIs alone and run it live on Fly.io.',
      },
    },
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'React', 'WebSocket', 'Docker', 'PostgreSQL', 'Fly.io', 'GitHub Actions'],
    links: [
      { kind: 'live', url: 'https://fde-shutter.fly.dev/' },
      { kind: 'org', url: 'https://github.com/fde-factory' },
    ],
    pipeline: {
      title: { ko: '견적에서 실측까지 한 줄로', en: 'One thread: quote to measurement' },
      nodes: [
        { id: 'd1', label: { ko: '견적 (규칙 엔진)', en: 'Quote (rule engine)' }, emphasis: true },
        { id: 'd2', label: { ko: '발주', en: 'Order' } },
        { id: 'd3', label: { ko: '승인', en: 'Approval' } },
        { id: 'd4', label: { ko: '품질', en: 'QC' } },
        { id: 'd5', label: { ko: '작업지시', en: 'Work order' } },
        { id: 'd6', label: { ko: '실측', en: 'Measurement' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD · GitHub Actions → Fly.io', en: 'CI/CD · GitHub Actions → Fly.io' },
      nodes: [
        { id: 'dd1', label: { ko: 'git push', en: 'git push' } },
        { id: 'dd2', label: { ko: 'CI: pytest · 골든 BOM 회귀', en: 'CI: pytest · golden-BOM regression' }, emphasis: true },
        { id: 'dd3', label: { ko: 'Alembic check (스키마 정합성)', en: 'Alembic check (schema integrity)' } },
        { id: 'dd4', label: { ko: 'Fly.io 백엔드 (fde-shutter-api)', en: 'Fly.io backend (fde-shutter-api)' }, emphasis: true },
        { id: 'dd5', label: { ko: 'Fly.io 프론트 (fde-shutter)', en: 'Fly.io front (fde-shutter)' } },
      ],
    },
    shots: [
      { src: 'shots/fde-5.jpg', caption: { ko: '① GitHub 조직 페이지 (fde-factory.github.io): 스마트팩토리 소개', en: '① GitHub org page (fde-factory.github.io) — smart-factory intro' } },
      { src: 'shots/fde-2.jpg', caption: { ko: '② 실적 대시보드: 견적·작업지시·생산 KPI', en: '② Performance dashboard — quote, work-order & production KPIs' } },
      { src: 'shots/fde-1.jpg', caption: { ko: '③ 견적: 7개 모델 제작 규칙 엔진 (원본 엑셀 양식 보존)', en: '③ Quote — rule engine for 7 models, Excel form preserved' } },
      { src: 'shots/fde-3.jpg', caption: { ko: '④ 작업지시 / 공정 보드', en: '④ Work-order / process board' } },
      { src: 'shots/fde-4.jpg', caption: { ko: '⑤ 품질관리서 발급: 자재 종합 검사', en: '⑤ QC certificate issuing — material inspection' } },
    ],
  },
  {
    id: 'closet',
    index: '05',
    name: "What's in my Closet",
    tagline: {
      ko: '"이거 비슷한 거 있었는데" 를 사기 전에 알려주는 옷장 앱',
      en: 'The wardrobe app that warns "you already own one like this" before you buy',
    },
    period: '2026.06',
    kind: 'solo',
    metrics: [
      { value: '94.7%', label: { ko: '중복 감지 정확도', en: 'duplicate-detection accuracy' } },
      { value: '0', label: { ko: '오경보 (평가셋)', en: 'false alarms (eval set)' } },
      { value: '0개', label: { ko: 'API 키로도 전 기능 동작', en: 'API keys needed to run it all' } },
      { value: '97·12', label: { ko: 'Vitest · Playwright', en: 'Vitest · Playwright' } },
    ],
    paar: {
      problem: {
        ko: '옷을 사고 나서야 "비슷한 거 있었는데" 하는 일이 잦은데, 정작 그걸 미리 알려주는 앱은 없었습니다.',
        en: 'We so often realize "I already had one like this" only after buying — yet no app actually warns you beforehand.',
      },
      approach: {
        ko: '"비슷하다"를 느낌이 아니라 믿을 수 있는 점수로 만들어야 했습니다.',
        en: 'I needed to turn "looks similar" into a score you can actually trust.',
      },
      action: {
        ko: '임베딩·색상거리(CIEDE2000)·카테고리를 가중 합성한 유사도 엔진을 만들고 pgvector로 검색했습니다. 외부 서비스 5종은 키가 없어도 돌아가도록 폴백으로 감쌌습니다.',
        en: 'I built a similarity engine that blends embeddings, CIEDE2000 color distance and category weights, and searched it with pgvector. The five external services I wrapped in fallbacks so it runs even with no keys.',
      },
      result: {
        ko: '평가셋으로 임계값을 직접 맞춰 중복 감지 94.7%·오경보 0을 확인했고, API 키 0개로도 전 기능이 돌아갑니다. Vitest 97·Playwright 12 덕에 같은 곳을 몇 번이고 갈아엎으며 다듬을 수 있었습니다.',
        en: 'Calibrating the threshold on a labeled set, I confirmed 94.7% accuracy with zero false alarms — and the whole thing runs with no API keys. With 97 Vitest and 12 Playwright tests, I could rework the same parts again and again without fear.',
      },
    },
    stack: ['Next.js', 'React', 'TypeScript', 'tRPC', 'Drizzle', 'PostgreSQL', 'pgvector', 'Auth.js', 'Playwright', 'Vitest'],
    links: [{ kind: 'repo', url: 'https://github.com/youmin0523/whats-in-my-closet' }],
    pipeline: {
      title: { ko: '사진 한 장에서 경고까지', en: 'From one photo to a warning' },
      nodes: [
        { id: 'e1', label: { ko: '옷 사진 업로드', en: 'Garment photo' } },
        { id: 'e2', label: { ko: '임베딩 + 색상 + 카테고리', en: 'Embedding + color + category' }, emphasis: true },
        { id: 'e3', label: { ko: 'pgvector 유사도 검색', en: 'pgvector similarity search' }, emphasis: true },
        { id: 'e4', label: { ko: '"비슷한 옷" 경고', en: '"Similar item" warning' } },
      ],
    },
    deploy: {
      title: { ko: 'CI/CD · GitHub Actions → Vercel', en: 'CI/CD · GitHub Actions → Vercel' },
      nodes: [
        { id: 'ed1', label: { ko: 'git push', en: 'git push' } },
        { id: 'ed2', label: { ko: 'CI: Typecheck · Vitest 97', en: 'CI: typecheck · Vitest 97' }, emphasis: true },
        { id: 'ed3', label: { ko: 'E2E: Playwright 12', en: 'E2E: Playwright 12' }, emphasis: true },
        { id: 'ed4', label: { ko: 'pnpm build', en: 'pnpm build' } },
        { id: 'ed5', label: { ko: 'Vercel (Next.js)', en: 'Vercel (Next.js)' } },
      ],
    },
    shots: [
      { src: 'shots/closet-2.jpg', caption: { ko: '① 랜딩: "가진 옷을 알면 충동구매가 멈춥니다"', en: '① Landing — "know what you own, stop impulse buys"' } },
      { src: 'shots/closet-3.jpg', caption: { ko: '② 옷장 대시보드: 카테고리·색상 필터', en: '② Wardrobe dashboard — category & color filters' } },
      { src: 'shots/closet-1.jpg', caption: { ko: '③ 3D 옷장 뷰어: 행거·선반·서랍에 옷 배치', en: '③ 3D wardrobe — garments across rods, shelves & drawers' } },
    ],
  },
  {
    id: 'eggtalk',
    index: '06',
    name: 'EggTalk',
    muted: true,
    tagline: {
      ko: '펫 키우기 앱에 붙인 대중교통 길찾기 모듈 (단독 담당)',
      en: 'A transit-routing module I owned inside a pet-care app',
    },
    period: '2026.02 ~ 03',
    kind: 'team',
    metrics: [],
    paar: {
      problem: {
        ko: '펫 키우기만 있는 앱이라 다시 켤 이유가 약했습니다. 매일 쓰는 대중교통 길찾기를 붙여 체류 시간을 늘려보기로 했습니다.',
        en: 'A pet-only app gave little reason to come back, so we tried adding the transit routing people use every day.',
      },
      approach: {
        ko: '여러 외부 지도 API를 한 번에 쓰되, 무료 한도를 넘기지 않는 구조가 필요했습니다.',
        en: 'I needed to combine several external map APIs at once without blowing past their free quotas.',
      },
      action: {
        ko: 'ODsay·Tmap·서울시 실시간 지하철 API를 백엔드에서 묶고, 지하철·버스·도보를 지도 위 하나의 폴리라인 경로로 그렸습니다.',
        en: 'I proxied ODsay, Tmap and Seoul’s live subway APIs on the backend and drew subway, bus and walking as a single polyline route on the map.',
      },
      result: {
        ko: '이후 팀 리뉴얼로 대부분 교체됐지만, 지도 API와 ODsay로 경로 폴리라인을 직접 그려본 경험은 그대로 남았습니다.',
        en: 'Most of it was later replaced in a team renewal, but the hands-on experience of rendering route polylines from map APIs and ODsay stayed with me.',
      },
    },
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Kakao Maps SDK', 'ODsay API', 'Tmap API'],
    links: [],
    pipeline: {
      title: { ko: '출발·도착에서 경로까지', en: 'From start/end to a route' },
      nodes: [
        { id: 'f1', label: { ko: '출발 · 도착', en: 'Origin · destination' } },
        { id: 'f2', label: { ko: 'ODsay · Tmap API', en: 'ODsay · Tmap API' } },
        { id: 'f3', label: { ko: '지도 폴리라인', en: 'Map polyline' }, emphasis: true },
      ],
    },
    deploy: {
      title: { ko: 'API 비용 방어', en: 'API cost defense' },
      nodes: [
        { id: 'fd1', label: { ko: 'Token Bucket', en: 'Token bucket' } },
        { id: 'fd2', label: { ko: '24h 캐시 · Throttle', en: '24h cache · throttle' }, emphasis: true },
      ],
    },
    shots: [
      { src: 'shots/eggtalk-1.jpg', caption: { ko: 'MS 모듈: Kakao 지도 기반 대중교통 길찾기 화면 (로컬 실행)', en: 'MS module — Kakao-map transit routing screen (local run)' } },
    ],
  },
]
