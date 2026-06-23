# Implementation Plan (v1.0_260623)

## 1. 시스템 아키텍처 및 구현 계획
- **Video Processing Pipeline**:
  - FFmpeg를 통해 `hero.mp4`와 `hero1.mp4`를 **각각 독립적인 핑퐁 루프 비디오**로 처리합니다. 
  - `hue=s=0` 로직으로 흑백 전환, `eq=contrast=1.1:brightness=-0.05`로 시네마틱 대비를 추가합니다.
  - 정주행 영상과 역주행(reverse) 영상을 `concat` 필터로 결합하여 각각 시작과 끝이 완전히 동일한 **Seamless Ping-Pong Loop**를 두 개 생성합니다.
- **Frontend Architecture**:
  - `src/sections/Hero.tsx` 내부 `<video>` 태그 2개를 생성하여 각각 `hero.mp4`와 `hero1.mp4`를 `src`로 할당합니다.
  - React의 `useState`(`activeVideo`)와 `onTimeUpdate` 이벤트를 사용하여 한 영상이 끝나기 1초 전(`duration - 1`)에 다른 영상을 선제적으로 재생(`play()`)시키고 `opacity` 애니메이션을 주어, 영상 사이의 딜레이 없는 완벽한 **Crossfade Overlapping**을 구현했습니다.
  - **Overlapping Fix 1 (Hero Layout)**: Hero 타이틀 텍스트(`profile.heroLines`)의 분할 단위를 `['YOU', 'MIN SU']`로 최적화하고, CSS `clamp()` 함수를 적용하여 모바일 디바이스에서 글자가 화면 폭을 초과하여 겹치는 현상을 원천 방지합니다.
  - **Overlapping Fix 2 (ProjectCard Layout)**: `src/components/ProjectCard.tsx`의 "데이터 파이프라인"과 "CI/CD Flow"를 표시하는 `SignalFlow` 요소가 데스크톱 환경에서 가로 공간 제약으로 인해 노드 텍스트가 겹치는 현상을 방지하고자, `lg:grid-cols-2` 레이아웃을 제거하고 완전히 독립된 수직 구조의 2개 섹션으로 분할 배치했습니다.

## 2. 데이터 흐름 (Data Flow)
- **Asset Flow**: 
  `public/hero.mp4`, `public/hero1.mp4` (Raw) ➡️ FFmpeg Ping-Pong Concat (Black&White, Reverse, Mute) ➡️ `public/hero.mp4`, `public/hero1.mp4` (독립 핑퐁 에셋 덮어쓰기)
- **UI Render Flow**:
  `Hero.tsx` ➡️ `activeVideo` State 변경 ➡️ `opacity-0` ↔ `opacity-[0.28]` 전환 및 `onEnded` 교차 Play

## 3. 검증 계획 (Validation)
- [주의] 영상 필터가 베이크되었기 때문에, React 애플리케이션에서는 CSS 필터를 통한 리페인팅(Repainting) 오버헤드가 줄어들었습니다. 프론트엔드 코드에 남아있던 필터 속성이 성공적으로 지워졌는지 교차 검증합니다.
- [주의] 브라우저 폭을 좁히고 넓힐 때 한국어 단어(예: "출력(Output)이")가 문자 단위로 잘리지 않고 단어 단위로 줄바꿈 되는지 확인합니다.
- [주의] 아이폰 SE 등 작은 폭의 디바이스 모드에서 Hero 섹션의 'YOU MIN SU' 텍스트가 가로로 넘치거나 줄바꿈되면서 요소 간 겹침 현상이 없는지 최종 확인합니다.
