import React from 'react'
import "./WorkList.scss"
import thumbImg from '../../assets/thumb.png'
import { Link, BrowserRouter } from 'react-router-dom'

const WorkList = () => {
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


    return (
    <section className='work-list-section'>
        <div className="inner">
               <ul className="work-list">
                    {homeWorks.map(({ title, thumb },i) => (

                        <li key={i}>
                            <Link to={`/works/${i}`} >
                            <img src={thumb} alt={title} />
                            </Link>
                        </li>
                    ))}
                </ul>
        </div>
    </section>
  )
}

export default WorkList