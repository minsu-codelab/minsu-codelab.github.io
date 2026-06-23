# 🌙 밤사이 작업 메모 (아침에 확인용)

> 민수님, 주무시는 동안 진행한 내용과 **확인/보완이 필요한 부분**을 정리했습니다.
> 사이트는 계속 배포되어 있습니다 → **https://minsu-codelab.github.io**

---

## ✅ 완료한 것

- **프로젝트 카드 전면 개편**: 큰 핵심수치(메트릭) + PAAR(문제·접근·실행·결과) + 메인 동작흐름(SignalFlow) + 보조 CI/CD(작게)
- **실측 수치 강조**(소스에서 직접 확인): ArcticTwin 84조합·출항 100%·수에즈 -40%, AeroInspect recall 90.4→94.1%·63,285장·Tier1<60ms, Re:Chord SDR 15.06dB·98.3%·pytest 220, FDE 16K LOC·27테이블·23 API·골든 36, Closet 94.7%·오경보 0
- **Hero 배경**: hero.mp4 + hero1.mp4 두 영상 크로스페이드 자연 루프
- **자동 슬라이드쇼 갤러리**(프로젝트별 실제 UI 스크린샷, 크로스페이드·라이트박스)
- **전체 카피 자연어 톤** 정리, **한/영 토글**, SignalFlow 중앙정렬, Skills 아이콘 정리
- **스크린샷 캡처 완료**:
  - ArcticTwin(5): Cesium 대시보드·지도·Fuel·What-if·Trend
  - AeroInspect(4): 3D 하자 리포트 뷰어·랜딩·기술스택  ※ 실시간 bbox는 아래 참조
  - Re:Chord(3): 랜딩·기능·작업화면
  - FDE(5): 견적 규칙엔진·대시보드·작업지시·품질관리서·조직페이지
  - Closet(3): 3D 옷장 뷰어·랜딩·대시보드
  - EggTalk(1): MS 길찾기 지도

사용한 계정: FDE `admin/a123456789`, AeroInspect `admin/admin`, Closet dev 로그인.

---

## ⚠️ 확인/보완이 필요한 부분 (제약으로 막힌 것)

### 1. AeroInspect 실시간 bbox 캡처 — ✅ 완료
- GCP VM 켜서 `admin/admin` 로그인 → 직원 허브 "현장 점검" → /dashboard → DroneShot RGB 영상 업로드
  → **실시간 하자 검출 bbox**("C-05 걸레받이 오염·파손 99%") + AI 하자 분석 패널 캡처 성공.
- 갤러리 3번째 컷으로 들어가 있습니다. **GCP VM은 캡처 직후 자동으로 꺼서 TERMINATED 확인**(과금 0).
- 더 밝은 프레임/다른 하자로 다시 잡고 싶으시면 동일 방식(아래)으로 재캡처 가능:
  ```bash
  gcloud compute instances start drone-stream-api --zone asia-northeast3-a --project drone-inspect-493608
  cd C:\Users\Codelab\Desktop\PROJECT\AeroInspect_frontend && npm run dev
  # localhost:5173 → admin/admin → "현장 점검" 카드 → 업로드 탭 → 영상 첨부
  # ★ 끝나면 반드시:
  gcloud compute instances stop drone-stream-api --zone asia-northeast3-a --project drone-inspect-493608
  ```
  ※ 업로드한 드론 영상 프레임이 어두운 구간이라 배경이 다소 검게 나왔습니다. 밝은 구간 영상으로 바꾸면 더 선명합니다.

### 2. ArcticTwin — Trend Report PDF
- 헤드리스 브라우저가 PDF 다운로드를 화면 렌더로 못 잡습니다.
- 수동: arctictwin.com → TREND REPORT → GENERATE REPORT → 생성된 PDF를 직접 스크린샷.
- 이미지 주시면 갤러리(arctictwin)에 바로 넣겠습니다.

### 3. Re:Chord — 악보(채보) 결과 화면
- 업로드→분리→채보는 라이브 백엔드에서 수 분 걸려 무인 자동화로 안정 캡처가 어려웠습니다.
- 수동: youmin.site → 음원 업로드 → 처리 완료 후 악보 화면 스크린샷.

### 4. EggTalk — 길찾기 폴리라인 / 실시간 지하철
- 운영 백엔드(keepinsight.site)가 **죽어 있어**(응답 000) 실제 경로/실시간 데이터가 안 옵니다.
- 로컬 프론트는 지도+길찾기 UI까지만 렌더됩니다(현재 갤러리 컷).
- 폴리라인을 로컬에서 보고 싶으면 `eggtalk-frontend/src/features/MS/MS.jsx` 의 `routeSegments` 에 샘플 좌표를 주입하면 됩니다(제가 시도한 방식). 원하시면 깨어계실 때 같이 띄워서 캡처하겠습니다.

### 5. Closet — 3D 옷장 채우기
- 현재는 DB 없이 **데모 아이템**으로 렌더된 3D 옷장입니다.
- 실제 옷으로 꽉 채우려면: `DATABASE_URL`(PostgreSQL+pgvector) 설정 → `db:migrate` → seed → 옷 업로드.

---

## 💡 제안
- 위 1~5의 이미지를 주시면 각 프로젝트 갤러리에 바로 추가/교체하겠습니다.
- `public/shots/` 에 `프로젝트-N.jpg` 형식으로 넣고 `src/data/projects.ts` 의 `shots` 배열만 늘리면 됩니다.
