# Hero 배경 영상 — Deevid AI 프롬프트

> Hero 섹션 배경에 깔리는 **블랙&화이트 모노톤 루프 영상** 제작용 프롬프트.
> 컨셉: *남자가 코딩하면, 모니터 밖 세상이 자동화·스마트화·로봇화로 변한다.*
> 영상은 텍스트(이름·태그라인) 뒤에 낮은 opacity(약 0.28)로 깔리므로 **중앙은 비교적 차분**하게,
> 움직임은 **느리고 부드럽게**, **seamless loop** 로 만든다.

---

## ⭐ 추천: 통합 원샷 프롬프트 (EN — 이것 하나만 붙여넣기)

> 와이드 컷 + 안경 반사 + 신호 흐름을 합치고 구조를 정리한 버전. 한 번에 잘 나오도록 권장.

> 소프트웨어 엔지니어링(코드·대시보드·데이터·클라우드) 중심, MacBook + macOS 화면으로 명시.
> 공장/로봇은 배경에 소량만. **루프를 위해 카메라 고정(줌/팬 금지)** + 반복 앰비언트 모션.

```
Cinematic black-and-white monochrome video, perfectly seamless loop — the first and last
frame match, continuous cyclic motion, no fade in and no fade out. A young Korean man in
his late twenties wearing glasses sits at a minimalist desk, seen from behind and slightly
to the side, typing on a silver Apple MacBook laptop. The MacBook screen clearly shows a
dark-themed code editor with scrolling lines of code and a terminal window, macOS style —
real software development. Around him, floating holographic software interfaces gently glow
and pulse in a repeating cycle: UI dashboards, data visualizations and line charts, network
graphs of connected nodes, web and mobile app screens, and cloud-server icons. Only a few
small automated robotic arms and drones appear far in the background, kept subtle. Thin
glowing white signal pulses travel along light lines in a continuous loop, flowing outward
from the MacBook screen into these interfaces. Locked-off static camera, no zoom, no pan,
only subtle ambient motion. High-contrast grayscale, fine film grain, soft volumetric
light, shallow depth of field. Strictly black and white, grayscale only.
```

### 네거티브 프롬프트 (별도 입력칸이 있을 때)

```
color, Windows logo, Windows UI, blue Windows screen, factory interior, heavy industrial
machinery filling the frame, fade in, fade out, abrupt cut, camera zoom, camera pan,
fast camera, shaky camera, text captions, subtitles, watermark, distorted hands, extra
fingers, deformed face, cartoon, anime, low quality, blurry
```

### 루프 솔기 제거 (받은 뒤 후처리 — 거의 확실)

영상에 솔기가 남으면 끝 0.5초를 처음과 크로스페이드해 매끄럽게 만든다:

```bash
# 5초 영상 기준, 끝 0.5초를 앞과 블렌드해 루프 솔기 제거
ffmpeg -i hero_raw.mp4 -filter_complex \
  "[0]split[a][b];[b]reverse[r];[a][r]xfade=transition=fade:duration=0.5:offset=4.5,format=yuv420p" \
  -an hero.mp4
```
> 또는 ping-pong(정→역재생) 방식도 가능하나 타이핑이 거꾸로 보이므로 크로스페이드 권장.

---

## 메인 프롬프트 (EN — 분리형 / 와이드 컷)

```
Black and white monochrome cinematic shot. A young Korean man in his late twenties,
wearing glasses, sits at a desk coding on a glowing monitor in a dark minimalist room,
seen from behind / three-quarter side.
Beyond the monitor, the world transforms through his code: automated robotic arms,
smart-factory machinery, drones flying, data streams and circuit-like light lines
spreading across a futuristic cityscape. Thin lines of light and signal pulses flow
outward from the screen into the world, symbolizing automation and digital
transformation. High contrast, fine film grain, soft volumetric light, slow steady
camera push-in, seamless loop. Monochrome, no color, no text, no logos, no captions.
```

## 보조 프롬프트 (대안 컷 — EN)

```
Monochrome, high-contrast cinematic. A young Korean man wearing glasses, seen in
profile, typing on a mechanical keyboard; in his glasses and the monitor reflection,
a grayscale world of robots, smart factories and flowing data lines comes alive.
Glowing white signal dots travel along thin lines from the screen outward into
darkness. Minimal, slow motion, fine grain, seamless loop, no color, no text, no logos.
```

## 설정 가이드

| 항목 | 권장값 |
|---|---|
| Style | Cinematic / Black & White |
| Motion | Subtle · Slow |
| Loop | On (seamless) |
| Aspect ratio | 16:9 (데스크톱) — 필요 시 9:16 세로 버전 추가 |
| Duration | 5–8초 |
| Text / Logo | 없음 |

## 산출물 배치

1. 결과물을 **`public/hero.mp4`** 로 저장 (가능하면 `public/hero.webm` 도 함께 — 용량↓).
2. 첫 프레임 캡처를 **`public/hero-poster.jpg`** 로 저장 (영상 로드 전·reduced-motion 폴백).
3. 1080p 기준 **2–4MB** 목표로 압축 (예: `ffmpeg -i in.mp4 -vf scale=1920:-2 -b:v 2M -an hero.mp4`).
   - `-an` 으로 오디오 제거 (배경 영상은 muted).
4. 파일을 넣으면 `Hero.tsx`의 `<video>`가 자동으로 재생한다. 파일이 없으면 그라데이션 배경만 표시(정상 동작).

> 참고: 영상은 `autoplay muted loop playsInline` 로 재생되며, `prefers-reduced-motion`
> 사용자는 정지 프레임(poster)만 보게 된다.
