const homeService = [
  {
    id: 1,
    title: "Web Design",
    subtitle: "당신의 브랜드를 시각적으로 설계합니다",
    desc1: "UI/UX 중심의 반응형 웹 디자인 제공",
    desc2: "Figma 기반으로 브랜드 아이덴티티에 맞춘 반응형 UI/UX 디자인을 설계하고, 일관된 웹 스타일을 구축합니다.",
    link: "/service#web-design"
  },
  {
    id: 2,
    title: "Frontend Development",
    subtitle: "보여지는 모든 것을 부드럽게 연결합니다",
    desc1: "React 기반 반응형 프론트엔드 개발",
    desc2: "최신 기술 스택을 활용해 빠르고 부드러운 사용자 인터페이스를 구현하며, SEO 최적화와 애니메이션 기능도 포함합니다.",
    link: "/service#frontend"
  },
  {
    id: 3,
    title: "Backend / API",
    subtitle: "기능을 움직이게 하는 보이지 않는 힘",
    desc1: "Node 기반 서버 및 API 설계",
    desc2: "Node.js와 Express 기반의 서버를 구축하고, 데이터베이스 연동 및 인증, 파일 업로드 등 기능을 포함한 API를 제공합니다.",
    link: "/service#backend"
  },
  {
    id: 4,
    title: "Maintenance & Hosting",
    subtitle: "배포 이후도 함께 합니다",
    desc1: "배포·호스팅·유지보수 통합 지원",
    desc2: "Vercel, Cloudtype 등을 통한 배포와 지속적인 유지관리, 에러 모니터링, 백업 등을 안정적으로 제공합니다.",
    link: "/service#maintenance"
  },
  {
    id: 5,
    title: "Brand Identity",
    subtitle: "처음 보는 순간, 기억되는 디자인",
    desc1: "로고/컬러/폰트 등 브랜드 통합 디자인",
    desc2: "브랜드 로고, 색상, 타이포그래피 등 시각적 요소를 통합하여 일관성 있는 브랜드 인상을 구축합니다.",
    link: "/service#brand"
  },
  {
    id: 6,
    title: "Landing Page Production",
    subtitle: "성과를 이끄는 단 하나의 페이지",
    desc1: "목표 중심의 랜딩 페이지 기획·제작",
    desc2: "마케팅 목적에 최적화된 구조와 콘텐츠로 구성된 랜딩 페이지를 기획부터 퍼블리싱까지 빠르게 제작합니다.",
    link: "/service#landing"
  },
  {
    id: 7,
    title: "Web Consulting",
    subtitle: "처음부터 끝까지, 디지털 파트너",
    desc1: "웹 전략 기획부터 구조 설계까지",
    desc2: "웹사이트 구축이 처음인 고객을 위해 목표 설정, 콘텐츠 흐름, 서비스 구조 등을 전략적으로 함께 설계합니다.",
    link: "/service#consulting"
  },
  {
    id: 8,
    title: "Web Design",
    subtitle: "당신의 브랜드를 시각적으로 설계합니다",
    desc1: "UI/UX 중심의 반응형 웹 디자인 제공",
    desc2: "Figma 기반으로 브랜드 아이덴티티에 맞춘 반응형 UI/UX 디자인을 설계하고, 일관된 웹 스타일을 구축합니다.",
    link: "/service#web-design"
  },
  {
    id: 9,
    title: "Frontend Development",
    subtitle: "보여지는 모든 것을 부드럽게 연결합니다",
    desc1: "React 기반 반응형 프론트엔드 개발",
    desc2: "최신 기술 스택을 활용해 빠르고 부드러운 사용자 인터페이스를 구현하며, SEO 최적화와 애니메이션 기능도 포함합니다.",
    link: "/service#frontend"
  },
  {
    id: 10,
    title: "Backend / API",
    subtitle: "기능을 움직이게 하는 보이지 않는 힘",
    desc1: "Node 기반 서버 및 API 설계",
    desc2: "Node.js와 Express 기반의 서버를 구축하고, 데이터베이스 연동 및 인증, 파일 업로드 등 기능을 포함한 API를 제공합니다.",
    link: "/service#backend"
  },
  {
    id: 11,
    title: "Maintenance & Hosting",
    subtitle: "배포 이후도 함께 합니다",
    desc1: "배포·호스팅·유지보수 통합 지원",
    desc2: "Vercel, Cloudtype 등을 통한 배포와 지속적인 유지관리, 에러 모니터링, 백업 등을 안정적으로 제공합니다.",
    link: "/service#maintenance"
  },
  {
    id: 12,
    title: "Brand Identity",
    subtitle: "처음 보는 순간, 기억되는 디자인",
    desc1: "로고/컬러/폰트 등 브랜드 통합 디자인",
    desc2: "브랜드 로고, 색상, 타이포그래피 등 시각적 요소를 통합하여 일관성 있는 브랜드 인상을 구축합니다.",
    link: "/service#brand"
  },
  {
    id: 13,
    title: "Landing Page Production",
    subtitle: "성과를 이끄는 단 하나의 페이지",
    desc1: "목표 중심의 랜딩 페이지 기획·제작",
    desc2: "마케팅 목적에 최적화된 구조와 콘텐츠로 구성된 랜딩 페이지를 기획부터 퍼블리싱까지 빠르게 제작합니다.",
    link: "/service#landing"
  },
  {
    id: 14,
    title: "Web Consulting",
    subtitle: "처음부터 끝까지, 디지털 파트너",
    desc1: "웹 전략 기획부터 구조 설계까지",
    desc2: "웹사이트 구축이 처음인 고객을 위해 목표 설정, 콘텐츠 흐름, 서비스 구조 등을 전략적으로 함께 설계합니다.",
    link: "/service#consulting"
  }
];
export default homeService;