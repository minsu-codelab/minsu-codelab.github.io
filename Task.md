# Task.md (v1.0_260623)

## 🎯 작업 목표 및 요구사항
- 포트폴리오 사이트 (https://minsu-codelab.github.io/)의 메인 Hero 비디오 구현
- `public/hero.mp4` 및 `public/hero1.mp4` 소스 비디오 처리
- 처리 옵션: 1080p 해상도 압축, 음소거, 흑백(Cinematic) 효과 적용, 5~8초 길이, 심리스 루프(Crossfade) 솔기 제거 처리
- `hero-poster.jpg` 포스터 이미지 추출
- 처리된 비디오를 `public/hero.mp4`로 덮어쓰기 및 변경된 에셋 Push
- 한국어 및 영어 줄바꿈(word-break) 어색하지 않도록 CSS 보정 (`keep-all`, `break-keep`)

## ✅ 진행 상황 (Checklist)
- [x] 비디오 해상도 확인 및 1080p 설정
- [x] FFmpeg를 통한 흑백(Monochrome) / Cinematic(Contrast, Brightness) 보정
- [x] 오디오 스트림 제거(음소거)
- [x] `xfade` 필터를 사용하여 영상 루프 솔기(seam) 제거 (Crossfade 1초 적용)
- [x] 영상의 첫 프레임을 활용하여 `hero-poster.jpg` 추출
- [x] 기존 `public/hero.mp4` 파일 백업 후 신규 생성된 비디오 파일로 교체
- [x] `src/sections/Hero.tsx`의 텍스트 엘리먼트에 `break-keep` 및 `whitespace-pre-wrap` 적용
- [x] `src/sections/Hero.tsx`의 기존 `grayscale`, `contrast-125` CSS 클래스 제거 (비디오에 직접 효과가 베이크됨)
- [ ] Git 커밋 및 Push 진행 (진행 예정)

## 🔄 Revision History
- **v1.0_260623**: 
  - `public/hero.mp4` 비디오 FFmpeg 처리 완료 (루프, 흑백, 크로스페이드)
  - 포스터 이미지 추출 완료
  - `src/sections/Hero.tsx` 컴포넌트 텍스트 줄바꿈 로직 개선 완료
