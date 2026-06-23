# Hero 배경 영상 — Deevid AI 프롬프트

> Hero 섹션 배경에 깔리는 **블랙&화이트 모노톤 루프 영상** 제작용 프롬프트.
> 컨셉: *남자가 코딩하면, 모니터 밖 세상이 자동화·스마트화·로봇화로 변한다.*
> 영상은 텍스트(이름·태그라인) 뒤에 낮은 opacity(약 0.28)로 깔리므로 **중앙은 비교적 차분**하게,
> 움직임은 **느리고 부드럽게**, **seamless loop** 로 만든다.

---

## 메인 프롬프트 (EN — Deevid 입력용)

```
Black and white monochrome cinematic shot. A young man sits at a desk coding on a
glowing monitor in a dark minimalist room, seen from behind / three-quarter side.
Beyond the monitor, the world transforms through his code: automated robotic arms,
smart-factory machinery, drones flying, data streams and circuit-like light lines
spreading across a futuristic cityscape. Thin lines of light and signal pulses flow
outward from the screen into the world, symbolizing automation and digital
transformation. High contrast, fine film grain, soft volumetric light, slow steady
camera push-in, seamless loop. Monochrome, no color, no text, no logos, no captions.
```

## 보조 프롬프트 (대안 컷 — EN)

```
Monochrome, high-contrast cinematic. Extreme close-up of hands typing on a mechanical
keyboard; in the monitor / glasses reflection, a grayscale world of robots, smart
factories and flowing data lines comes alive. Glowing white signal dots travel along
thin lines from the screen outward into darkness. Minimal, slow motion, fine grain,
seamless loop, no color, no text, no logos.
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
