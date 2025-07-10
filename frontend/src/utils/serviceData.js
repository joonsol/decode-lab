// serviceData.js
import serviceBg from "../assets/hero-service-bg.png"
import serviceOverView1 from "../assets/service-overview-1.png"
import serviceOverView2 from "../assets/service-overview-2.png"
import serviceOverView3 from "../assets/service-overview-3.png"
import serviceOverView4 from "../assets/service-overview-4.png"
export const serviceIntro = {
  bg: serviceBg,
  title: "service",
  description: "기획부터 디자인, 개발, 배포, 유지보수까지 – DECODE.Lab이 함께합니다.",
};
// serviceData.js


// ✅ 서비스 카드 데이터
export const serviceOverview = {
  title: "우리는 이렇게 일합니다",
  desc: "DECODE.Lab은 처음부터 끝까지 함께하는 과정을 중요하게 생각합니다.",
  overview:
    [
      {
        id: "web-design",
        title: "Web Design",
        slogan: "당신의 브랜드를 시각적으로 설계합니다",
        desc1: ["사용자의 눈과 마음을 사로잡는",
          " UI/UX 중심 디자인"],
        desc2: [
          "Figma 기반 시안 제공, 반응형 최적화",
          "브랜드 아이덴티티에 맞춘 컬러·타이포·레이아웃 설계"
        ],
        bg: serviceOverView1
      },
      {
        id: "frontend",
        title: "Frontend Development",
        slogan: "보여지는 모든 것을 부드럽게 연결합니다",
        desc1: ["React 기반의 빠르고"," 반응형이 뛰어난 프론트 개발"],
        desc2: [
          "인터랙션 구현(GSAP, Swiper 등 포함 가능)",
          "HTML/CSS/JavaScript 최적화로 SEO 고려"
        ],
        bg: serviceOverView2

      },
      {
        id: "backend",
        title: "Backend / API",
        slogan: "기능을 움직이게 하는 보이지 않는 힘",
        desc1: ["Node.js + Express 기반의"," 안정적인 서버 구축"],
        desc2: [
          "MongoDB 또는 MySQL, 인증 · 파일업로드 포함",
          "클라이언트를 위한 RESTful API 제공"
        ],
        bg: serviceOverView3

      },
      {
        id: "maintenance",
        title: "Maintenance & Hosting",
        slogan: "배포 이후도 함께 합니다",
        desc1: ["Vercel / Cloudtype / AWS 기반"," 배포 및 호스팅 지원"],
        desc2: [
          "Uptime 유지, 에러 모니터링, 주기적 백업",
          "소규모 유지보수 및 기능 개선 패키지 제공"
        ],
        bg: serviceOverView4

      },
    ]
}
// ✅ 작업 프로세스
export const serviceProcess = {
  title: "우리는 이렇게 일합니다",
  desc: "DECODE.Lab은 처음부터 끝까지 함께하는 과정을 중요하게 생각합니다.",
  process: [
    {
      step: "Consulting",
      title: "당신의 아이디어를 경청합니다",
      desc: "고객의 니즈, 비즈니스 목표, 예산과 일정 등을 이해하기 위한 초기 미팅을 진행합니다. 유사 레퍼런스나 기능 정리도 함께 도와드립니다.",
      summary: "👉 목표 정의 + 방향성 파악",
    },
    {
      step: " Planning",
      title: "구현 가능한 전략을 세웁니다",
      desc: "사이트의 정보구조, 콘텐츠 구성, 사용자 플로우 등을 기획하고 필요 시 와이어프레임/기능명세서를 작성합니다.",
      summary: "👉 개발과 디자인 전, 명확한 설계안 수립",
    },
    {
      step: " Design",
      title: "시각적으로 차별화된 경험을 만듭니다",
      desc: "브랜드 톤에 맞는 UI/UX 디자인을 Figma를 통해 제작하며, 반응형 디바이스별 시안도 함께 제공합니다.",
      summary: "👉 디자인 시안 확인 및 피드백 반영",
    },
    {
      step: " Development",
      title: "빠르고 안정적인 기능을 구현합니다",
      desc: "React 프론트엔드와 Node.js 백엔드(API 포함) 개발을 진행하며, Git 기반 버전 관리와 모듈화된 코드 구조를 유지합니다.",
      summary: "👉 클라이언트 요청 기능을 안정적으로 구현",
    },
    {
      step: " Testing",
      title: "꼼꼼한 점검으로 완성도를 높입니다",
      desc: "다양한 브라우저 및 디바이스에서의 호환성을 확인하고, 사용성 테스트 및 버그 수정을 진행합니다.",
      summary: "👉 QA 완료 후 최종 피드백 수렴",
    },
    {
      step: " Launch",
      title: "당신의 서비스, 세상과 연결합니다",
      desc: "Vercel, Cloudtype, AWS 등 최적의 환경으로 배포하고, SEO 초기 세팅, 애널리틱스 연결, 유지보수 옵션을 안내합니다.",
      summary: "👉 실서비스 런칭 및 사후 지원 안내",
    }
  ]
};

