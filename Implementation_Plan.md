# Implementation Plan (v1.0_260623)

## 1. 시스템 아키텍처 및 구현 계획
- **Video Processing Pipeline**:
  - FFmpeg를 통해 `hero.mp4`와 `hero1.mp4`를 조합합니다. 
  - `hue=s=0` 로직으로 흑백 전환, `eq=contrast=1.1:brightness=-0.05`로 시네마틱 대비를 추가합니다.
  - 정주행 영상과 역주행(reverse) 영상을 `concat` 필터로 4등분(hero -> hero1 -> hero1_rev -> hero_rev) 결합하여 시작과 끝이 완전히 동일한 **Seamless Ping-Pong Loop**를 생성합니다.
- **Frontend Architecture**:
  - `src/sections/Hero.tsx` 내부 `<video>` 태그에 적용되어 있던 무거운 CSS 필터(`grayscale contrast-125`)를 제거하고 처리된 비디오 에셋을 그대로 렌더링하도록 최적화합니다.
  - `src/index.css`의 `body` 선택자에 `word-break: keep-all` 및 `overflow-wrap: break-word`를 전역적으로 선언하여, Hero 섹션뿐만 아니라 사이트 전체에서 한국어 단어가 문자 단위로 깨지는 현상을 확실하게 차단합니다.
  - **Overlapping Fix**: Hero 타이틀 텍스트(`profile.heroLines`)의 분할 단위를 `['YOU', 'MIN SU']`로 최적화하고, CSS `clamp()` 함수를 적용하여 모바일 디바이스에서 글자가 화면 폭을 초과하여 겹치는 현상을 원천 방지합니다.

## 2. 데이터 흐름 (Data Flow)
- **Asset Flow**: 
  `public/hero.mp4` + `public/hero1.mp4` (Raw) ➡️ FFmpeg Ping-Pong Concat (Black&White, Reverse, Mute) ➡️ `public/hero_sequence.mp4` ➡️ `public/hero.mp4` (최종 덮어쓰기)
- **UI Render Flow**:
  `data/profile.ts` (분할된 라인) ➡️ `Hero.tsx` ➡️ 뷰포트 상대 크기 연산(`clamp()`) ➡️ 문자 간 겹침 없는 렌더링

## 3. 검증 계획 (Validation)
- [주의] 영상 필터가 베이크되었기 때문에, React 애플리케이션에서는 CSS 필터를 통한 리페인팅(Repainting) 오버헤드가 줄어들었습니다. 프론트엔드 코드에 남아있던 필터 속성이 성공적으로 지워졌는지 교차 검증합니다.
- [주의] 브라우저 폭을 좁히고 넓힐 때 한국어 단어(예: "출력(Output)이")가 문자 단위로 잘리지 않고 단어 단위로 줄바꿈 되는지 확인합니다.
- [주의] 아이폰 SE 등 작은 폭의 디바이스 모드에서 Hero 섹션의 'YOU MIN SU' 텍스트가 가로로 넘치거나 줄바꿈되면서 요소 간 겹침 현상이 없는지 최종 확인합니다.
