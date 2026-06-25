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
    problem: string
    approach: string
    action: string
    result: string
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
    journey: '경력',
    contact: '연락처',
  },
  hero: {
    role: 'AI 풀스택 개발자',
    tagline: '입력이 있으면, 반드시 출력이 있다.',
    scroll: '스크롤',
  },
  about: {
    label: '소개',
    heading: '배운 걸 결과물로\n증명하는 개발자',
    body: [
      '방화셔터를 설계하고 현장을 관리하며 4년을 보냈습니다. 제조 현장에서 문제를 정의하고 푸는 일을 하다, 그 과정을 코드로 옮기고 싶어 개발을 시작했습니다.',
      '지금은 공공데이터와 AI, 실시간 시스템을 다뤄 "그래서 결과가 뭔데?"에 숫자로 답하는 풀스택 개발을 합니다. 코드를 짰다고 끝이 아니라, 측정하고 검증해야 끝이라고 생각합니다.',
    ],
    pillars: [
      {
        title: '말 대신 숫자로',
        desc: 'SDR·recall·정확도를 CI 게이트에 걸어, 좋아진 건 수치로 보여주고 나빠진 건 자동으로 막습니다.',
      },
      {
        title: '깨질 걸 가정하고 만든다',
        desc: 'DB가 죽으면 스냅샷으로, API 키가 없으면 폴백으로. 실패할 상황을 미리 가정하고 대비책을 깔아둡니다. 잘 되는 경우만 짜두면, 가끔 터지는 문제가 그대로 사용자에게 가니까요.',
      },
      {
        title: '기획부터 배포까지',
        desc: '규칙 엔진, AI 파이프라인, 실시간 시스템, 배포까지 혼자 끝까지 이어붙여 봤습니다.',
      },
    ],
  },
  skills: {
    label: '기술',
    heading: '기술 스택',
    note: '배우고 끝낸 게 아니라, 실제 서비스에 넣어보고 남긴 것들입니다.',
  },
  work: {
    label: '프로젝트',
    heading: '주요 프로젝트',
    note: '입력에서 출력까지, 각 프로젝트가 뭘 하고 어떻게 돌아가는지 흐름으로 풀었습니다.',
    team: '팀',
    solo: '개인',
    pipeline: '동작 흐름',
    deploy: 'CI/CD · 배포',
    problem: '문제',
    approach: '접근',
    action: '실행',
    result: '결과',
    live: '라이브',
    frontend: '프론트엔드',
    backend: '백엔드',
    repo: '저장소',
    org: '조직',
  },
  journey: {
    label: '경력',
    heading: '경력 · 학력',
  },
  contact: {
    label: '연락처',
    heading: '같이 만들어요',
    line: '새 기술을 실제 제품으로 이어붙이는 일에 관심 있는 팀이라면 편하게 연락 주세요.',
    email: '이메일',
    github: '깃허브',
    backToTop: '맨 위로',
  },
  footer: {
    built: 'React · GSAP · Framer Motion',
  },
}

const en: Dict = {
  nav: {
    about: 'About',
    skills: 'Skills',
    work: 'Work',
    journey: 'Experience',
    contact: 'Contact',
  },
  hero: {
    role: 'AI Full-Stack Developer',
    tagline: 'Where there is an input, there is always an output.',
    scroll: 'Scroll',
  },
  about: {
    label: 'About',
    heading: 'I prove what I learn\nby shipping it',
    body: [
      'I spent four years designing fire shutters and running the factory floor — defining and solving real manufacturing problems. I wanted to put that work into code, so I moved into development.',
      'Now I work across public data, AI and real-time systems to answer one question with numbers: "so what actually came out of it?" To me, writing the code isn’t the finish line — measuring and verifying it is.',
    ],
    pillars: [
      {
        title: 'Numbers over claims',
        desc: 'SDR, recall and accuracy sit on CI gates — gains show up as numbers, regressions get blocked automatically.',
      },
      {
        title: 'Built assuming it breaks',
        desc: 'DB down? Fall back to a snapshot. No API key? Fall back to a stub. I plan for failure up front — code only the happy path and the occasional breakage lands straight on the user.',
      },
      {
        title: 'Plan to deploy',
        desc: 'Rule engines, AI pipelines, real-time systems, deployment — I’ve wired them all together end to end, solo.',
      },
    ],
  },
  skills: {
    label: 'Skills',
    heading: 'Tech Stack',
    note: 'Not just learned, but put into real services and kept what stuck.',
  },
  work: {
    label: 'Work',
    heading: 'Selected Projects',
    note: 'From input to output — each project laid out as what it does and how it runs.',
    team: 'Team',
    solo: 'Solo',
    pipeline: 'How it works',
    deploy: 'CI/CD · Deploy',
    problem: 'Problem',
    approach: 'Approach',
    action: 'Action',
    result: 'Result',
    live: 'Live',
    frontend: 'Frontend',
    backend: 'Backend',
    repo: 'Repo',
    org: 'Org',
  },
  journey: {
    label: 'Experience',
    heading: 'Experience & Education',
  },
  contact: {
    label: 'Contact',
    heading: "Let's build something",
    line: 'If your team cares about turning new tech into real products, I’d love to talk.',
    email: 'Email',
    github: 'GitHub',
    backToTop: 'Back to top',
  },
  footer: {
    built: 'React · GSAP · Framer Motion',
  },
}

export const dict: Record<'ko' | 'en', Dict> = { ko, en }
