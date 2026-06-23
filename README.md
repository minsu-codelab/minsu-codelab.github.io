# YOU MIN SU — Portfolio

AI 풀스택 개발자 유민수의 포트폴리오. 블랙&화이트 모노톤, 시네마틱 스크롤 + 신호 흐름 애니메이션.

- **Stack:** Vite · React · TypeScript · Tailwind CSS · GSAP (ScrollTrigger) · Framer Motion · Lenis
- **언어:** 한국어 / English 토글
- **배포:** GitHub Pages (조직 페이지) → https://minsu-codelab.github.io

## 개발

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 타입체크 + 프로덕션 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
```

## Hero 배경 영상

`docs/deevid-hero-prompt.md` 의 프롬프트로 Deevid AI 영상을 만든 뒤,
`public/hero.mp4` (+ `hero.webm`, `hero-poster.jpg`) 로 넣으면 자동 재생됩니다.
영상이 없어도 그라데이션 배경으로 정상 동작합니다.

## 배포 (GitHub Pages · 조직 페이지)

1. GitHub 조직 **`minsu-codelab`** 생성 → 저장소 **`minsu-codelab.github.io`** (Public) 생성
2. 이 프로젝트를 해당 저장소에 push (`main` 브랜치)
3. 저장소 **Settings → Pages → Source = GitHub Actions**
4. push 시 `.github/workflows/deploy.yml` 가 자동 빌드·배포 → https://minsu-codelab.github.io

> 조직 페이지는 루트에서 서빙되므로 `vite.config.ts` 의 `base` 는 `'/'` 입니다.

## 콘텐츠 수정

- 프로필/연락처: `src/data/profile.ts`
- 프로젝트(요약·성과·링크·신호 흐름): `src/data/projects.ts`
- 기술 스택 / 아이콘: `src/data/skills.ts`
- 경력·학력: `src/data/experience.ts`
- UI 문구(KO/EN): `src/i18n/dict.ts`
