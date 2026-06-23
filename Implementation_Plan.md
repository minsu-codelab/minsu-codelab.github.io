# Implementation Plan (v1.0_260623)

## 1. 시스템 아키텍처 및 구현 계획
- **Video Processing Pipeline**:
  - FFmpeg를 통해 Raw `.mp4` 파일을 변환합니다. 
  - `hue=s=0` 로직으로 흑백 전환, `eq=contrast=1.1:brightness=-0.05`로 시네마틱 대비를 추가합니다.
  - 영상을 두 개로 분할하고 `xfade` 필터를 이용하여 마지막 1초와 첫 1초를 페이드-인/아웃으로 겹쳐(seamless loop) 끊김 없는 무한 재생을 유도합니다.
- **Frontend Architecture**:
  - `src/sections/Hero.tsx` 내부 `<video>` 태그에 적용되어 있던 무거운 CSS 필터(`grayscale contrast-125`)를 제거하고 처리된 비디오 에셋을 그대로 렌더링하도록 최적화합니다.
  - `t.hero.role` 및 `t.hero.tagline`이 렌더링되는 Text Node에 Tailwind CSS의 `break-keep`(word-break: keep-all) 및 `whitespace-pre-wrap`을 추가하여 디바이스 크기 변경 시 한국어/영어 단어가 쪼개지는 현상을 방지합니다.

## 2. 데이터 흐름 (Data Flow)
- **Asset Flow**: 
  `public/hero.mp4` (Raw) ➡️ FFmpeg Video Filter (Black&White, Crossfade, Mute) ➡️ `public/hero_bg.mp4` ➡️ `public/hero.mp4` (최종 덮어쓰기)
- **UI Render Flow**:
  `i18n/dict.ts` ➡️ `LanguageContext` ➡️ `Hero.tsx` (`t.hero.tagline`) ➡️ CSS `break-keep` 적용 ➡️ 화면 렌더링

## 3. 검증 계획 (Validation)
- [주의] 영상 필터가 베이크되었기 때문에, React 애플리케이션에서는 CSS 필터를 통한 리페인팅(Repainting) 오버헤드가 줄어들었습니다. 프론트엔드 코드에 남아있던 필터 속성이 성공적으로 지워졌는지 교차 검증합니다.
- [주의] 브라우저 폭을 좁히고 넓힐 때 한국어 단어(예: "출력(Output)이")가 문자 단위로 잘리지 않고 단어 단위로 줄바꿈 되는지 확인합니다.
