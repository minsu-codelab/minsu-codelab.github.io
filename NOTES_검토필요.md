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

### 2. ArcticTwin — Trend Report PDF — ✅ 완료
- TREND REPORT → GENERATE REPORT → PREVIEW REPORT의 **인라인 PDF 미리보기**를 캡처(표지 + 10p 표·차트 썸네일). 갤러리 ⑥번 컷.
- 내부 표/차트 페이지를 더 넣고 싶으면 PDF를 직접 열어 페이지별 스크린샷 주세요.

### 3. Re:Chord — 악보(채보) 결과 화면 — 부분 (작업화면 추가, 악보는 미완)
- 무인 업로드→"변환 시작"까지 자동화했으나, **합성 테스트 오디오 업로드가 라이브 백엔드에서 `network error`** 로 막혀 악보까지는 못 갔습니다.
- 대신 **실제 변환 작업 화면**(음원 가져오기 + Quick MR/Karaoke/Stems/Pro 모드 선택)을 깨끗하게 캡처해 갤러리 ③에 추가했습니다.
- **악보 결과**는 실제 곡(mp3/wav) 하나를 youmin.site에 올려 변환하면 나옵니다 — 그 악보 화면 캡처 주시면 갤러리에 추가하겠습니다.

### 4. EggTalk — 길찾기 폴리라인 / 실시간 지하철 — 부분 (방법 찾음)
- 운영 백엔드(keepinsight.site)는 죽었지만, **로컬 백엔드(`eggtalk-backend`)가 ODsay/Tmap/지하철 API 키를 갖고 있어 실행하면 실제 경로가 나옵니다** (시청→강남 40분 응답 실측 확인).
- 다만 Kakao 지도 DOM이 무거워 헤드리스 자동 검색이 불안정 → 현재 갤러리는 MS 지도+길찾기 UI 컷.
- **로컬 재현(30초)**: `eggtalk-backend`에서 `node index.js`(:8000) → `eggtalk-frontend`에서 `npm run dev` → /ms에서 출발/도착 입력·검색하면 실제 폴리라인이 그려집니다. 그 화면 캡처 주시면 교체하겠습니다.

### 5. Closet — 3D 옷장 채우기 — ✅ 완료
- 시스템 PostgreSQL은 비번/pgvector 문제로 막혀, **3D 옷장에 옷 30벌을 배치한 컷**으로 교체했습니다(행거·선반·서랍 채워짐).
- 실제 DB 데이터로 하려면 pgvector 포함 DB(Docker `pgvector/pgvector:pg16` 권장) + `db:migrate` + 옷 등록이 필요합니다.

---

## 💡 제안
- 위 1~5의 이미지를 주시면 각 프로젝트 갤러리에 바로 추가/교체하겠습니다.
- `public/shots/` 에 `프로젝트-N.jpg` 형식으로 넣고 `src/data/projects.ts` 의 `shots` 배열만 늘리면 됩니다.
