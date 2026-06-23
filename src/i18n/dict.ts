// UI chrome strings (section labels, nav, etc.). Project/profile content lives in /data.

export interface Dict {
  nav: {
    about: string
    skills: string
    work: string
    journey: string
    contact: string
  }
  hero: {
    role: string
    tagline: string
    scroll: string
  }
  about: {
    label: string
    heading: string
    body: string[]
    pillars: { title: string; desc: string }[]
  }
  skills: {
    label: string
    heading: string
    note: string
  }
  work: {
    label: string
    heading: string
    note: string
    team: string
    solo: string
    pipeline: string
    deploy: string
    live: string
    frontend: string
    backend: string
    repo: string
    org: string
  }
  journey: {
    label: string
    heading: string
  }
  contact: {
    label: string
    heading: string
    line: string
    email: string
    github: string
    backToTop: string
  }
  footer: {
    built: string
  }
}

const ko: Dict = {
  nav: {
    about: '소개',
    skills: '기술',
    work: '프로젝트',
    journey: '여정',
    contact: '연락',
  },
  hero: {
    role: 'AI 풀스택 개발자',
    tagline: '입력(Input)이 있으면, 반드시 출력(Output)이 있다.',
    scroll: '스크롤',
  },
  about: {
    label: '소개',
    heading: '배움을 결과물로 증명하는\n풀스택 개발자',
    body: [
      '4년간 방화셔터 설계·현장 관리(PM)로 제조 현장의 문제를 정의하고 풀어왔습니다. 그 경험을 코드로 옮겨, 이제는 공공데이터·AI·실시간 시스템을 정량 지표와 제품으로 잇는 풀스택 개발자가 되었습니다.',
      '"코드를 만들었다 ≠ 검증했다." 측정 가능한 수치, 회귀 테스트, 폴백 설계를 1급 시민으로 두고 일합니다. 기획부터 모델 학습, 백엔드, 프론트, 배포까지 한 흐름으로 끝내는 것을 지향합니다.',
    ],
    pillars: [
      {
        title: '측정으로 증명',
        desc: 'SDR·recall·정확도 게이트를 CI에 박아 모든 개선을 수치로, 모든 퇴행을 자동 차단으로.',
      },
      {
        title: '실패를 전제로 설계',
        desc: 'PostgreSQL→스냅샷 폴백, API 키 0개 동작, 429 자동 폴백. 깨질 것을 가정하고 만든다.',
      },
      {
        title: '기획부터 배포까지',
        desc: '도메인 규칙 엔진, AI 파이프라인, 실시간 시스템, CI/CD를 단독으로 잇는 풀스택.',
      },
    ],
  },
  skills: {
    label: '기술',
    heading: '보유 기술',
    note: '학습으로 끝내지 않고, 실제 서비스에 투입해 검증한 스택.',
  },
  work: {
    label: '프로젝트',
    heading: '선택된 작업',
    note: '입력에서 출력까지 — 각 프로젝트의 데이터 흐름과 배포 구조를 신호로 시각화했습니다.',
    team: '팀 프로젝트',
    solo: '개인 프로젝트',
    pipeline: '데이터 파이프라인',
    deploy: '배포 · 인프라',
    live: '라이브',
    frontend: '프론트엔드',
    backend: '백엔드',
    repo: '저장소',
    org: '조직',
  },
  journey: {
    label: '여정',
    heading: '경력 · 학력',
  },
  contact: {
    label: '연락',
    heading: '함께 만들어요',
    line: '새로운 기술을 실제 결과물로 잇는 일에 관심 있는 팀과 이야기하고 싶습니다.',
    email: '이메일',
    github: '깃허브',
    backToTop: '맨 위로',
  },
  footer: {
    built: 'React · GSAP · Framer Motion 으로 제작 · 모노톤',
  },
}

const en: Dict = {
  nav: {
    about: 'About',
    skills: 'Skills',
    work: 'Work',
    journey: 'Journey',
    contact: 'Contact',
  },
  hero: {
    role: 'AI Full-Stack Developer',
    tagline: 'Where there is an Input, there must be an Output.',
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    heading: 'A full-stack developer who\nproves learning with output',
    body: [
      'For four years I defined and solved manufacturing problems as a fire-shutter design & site manager (PM). I turned that experience into code — and became a full-stack developer who bridges public data, AI and real-time systems into quantified metrics and shipped products.',
      '"Writing code ≠ verifying it." I treat measurable numbers, regression gates and fallback design as first-class citizens. My aim is to take a product end-to-end: planning, model training, backend, frontend and deployment.',
    ],
    pillars: [
      {
        title: 'Proven by measurement',
        desc: 'SDR, recall and accuracy gates baked into CI — every gain is a number, every regression is auto-blocked.',
      },
      {
        title: 'Designed for failure',
        desc: 'PostgreSQL→snapshot fallback, zero-key operation, automatic 429 fallback. Built assuming things break.',
      },
      {
        title: 'Plan to deploy, solo',
        desc: 'Domain rule engines, AI pipelines, real-time systems and CI/CD — wired together single-handedly.',
      },
    ],
  },
  skills: {
    label: 'Skills',
    heading: 'Tech Stack',
    note: 'Not just learned — put into real services and verified.',
  },
  work: {
    label: 'Work',
    heading: 'Selected Work',
    note: 'From input to output — each project visualizes its data flow and deployment as signals.',
    team: 'Team',
    solo: 'Solo',
    pipeline: 'Data Pipeline',
    deploy: 'Deploy · Infra',
    live: 'Live',
    frontend: 'Frontend',
    backend: 'Backend',
    repo: 'Repo',
    org: 'Org',
  },
  journey: {
    label: 'Journey',
    heading: 'Experience · Education',
  },
  contact: {
    label: 'Contact',
    heading: "Let's build together",
    line: 'I want to talk with teams who care about turning new technology into real, shipped products.',
    email: 'Email',
    github: 'GitHub',
    backToTop: 'Back to top',
  },
  footer: {
    built: 'Built with React · GSAP · Framer Motion · Monochrome',
  },
}

export const dict: Record<'ko' | 'en', Dict> = { ko, en }
