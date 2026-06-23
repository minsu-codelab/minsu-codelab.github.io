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
- [x] `src/index.css` `body` 태그에 `word-break: keep-all` 전역 적용하여 전체 사이트 줄바꿈 최적화
- [x] `src/sections/Hero.tsx`의 기존 `grayscale`, `contrast-125` CSS 클래스 제거 (비디오에 직접 효과가 베이크됨)
- [x] `hero.mp4` 및 `hero1.mp4` 모두 사용 요구사항에 맞춰 두 개의 비디오를 각각 B&W 핑퐁화하여 독립적인 에셋으로 적용
- [x] 모바일 환경의 반응형 타이틀 글자 겹침(Overlapping) 문제를 `clamp()` 폰트 사이즈와 분할 교정으로 완벽히 해결
- [x] Git 커밋 및 Push 진행 (진행 완료)

## 🔄 Revision History
> **[Current Revision: v1.4_260623]**
> - **v1.4_260623**: 
>   - 사용자의 "hero, hero1 둘 다 사용" 요청에 따라 `hero.mp4`와 `hero1.mp4`를 독립 에셋으로 분리 복원하고 React State를 통해 번갈아 재생되도록 `Hero.tsx` 로직 수정
> - **v1.3_260623**:
>   - [src/sections/Hero.tsx, src/data/profile.ts]: 모바일 디바이스 가로축 넘침 방지를 위한 `clamp()` 적용 및 `heroLines` 분할 단위 조정
> - **v1.2_260623**: 
>   - `public/hero.mp4`: `hero.mp4`와 `hero1.mp4`를 결합한 30초 핑퐁(정-역) 무한 루프 시퀀스 비디오 교체 적용
> - **v1.1_260623**: 
>   - `src/index.css`에 전역 `word-break: keep-all` 추가 적용
> - **v1.0_260623**: 
>   - `public/hero.mp4` 비디오 FFmpeg 처리 및 `src/sections/Hero.tsx` 기초 보정
