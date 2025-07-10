import React from 'react'
import WorkHero from './WorkHero'
import thumbImg from '../../assets/thumb.png'
import "./WorkItem.scss"
import { useParams } from 'react-router-dom'
const WorkItem = () => {
  const homeWorks = [
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
  ];

  const { id } = useParams()
  // id와 일치하는 항목 찾기
  const work = homeWorks.find((item, i) => {

    console.log(i)
    if (i == id) {
      return item
    }
  });
  // i==id? return item : return "";
  if (!work) return <div>프로젝트를 찾을 수 없습니다.</div>;


  return (


    <div>
      <WorkHero />
      <section className='work-item'>

        <div className="inner">
          <div className="img-wrap"
            style={{
              backgroundImage: `url(${work.thumb})`  // ✅ 올바른 key
            }}
          >
          </div>
          <div className="t-wrap">

            <h1 className='sub-tit'>{work.desc1}</h1>
            <p className='sub-txt'>{work.title}</p>
            <p className='sub-txt2'>{work.desc2}</p>
            <p className='sub-txt3'>
              <span>

              {work.category}
              </span>
              <span>
              {work.client}

              </span>
              </p>
            <a href={work.link} className='sub-btn btn'>
              project view
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkItem