import React from 'react'
import thumbImg from '../../assets/thumb.png'
import { Link, BrowserRouter } from 'react-router-dom'
import "./Work.scss"

const Work = () => {

    const homeWorks = [
        {
            title: "Responsive Portfolio Site",
            thumb: thumbImg,
            description: "반응형으로 제작된 웹 포트폴리오 사이트",
            category: "Web Design",
            client: "Brand X",
           
        },
        {
            title: "E-commerce Platform",
            thumb: thumbImg,
            description: "사용자 중심의 UI로 설계된 쇼핑몰 플랫폼",
            category: "UI/UX Design",
            client: "OnlineMall Co.",
           
        },
        {
            title: "Responsive Portfolio Site",
            thumb: thumbImg,
            description: "반응형으로 제작된 웹 포트폴리오 사이트",
            category: "Web Design",
            client: "Brand X",
           
        },
        {
            title: "E-commerce Platform",
            thumb: thumbImg,
            description: "사용자 중심의 UI로 설계된 쇼핑몰 플랫폼",
            category: "UI/UX Design",
            client: "OnlineMall Co.",
           
        },
        {
            title: "Responsive Portfolio Site",
            thumb: thumbImg,
            description: "반응형으로 제작된 웹 포트폴리오 사이트",
            category: "Web Design",
            client: "Brand X",
           
        },
        {
            title: "E-commerce Platform",
            thumb: thumbImg,
            description: "사용자 중심의 UI로 설계된 쇼핑몰 플랫폼",
            category: "UI/UX Design",
            client: "OnlineMall Co.",
           
        },
        {
            title: "Responsive Portfolio Site",
            thumb: thumbImg,
            description: "반응형으로 제작된 웹 포트폴리오 사이트",
            category: "Web Design",
            client: "Brand X",
           
        },
        {
            title: "E-commerce Platform",
            thumb: thumbImg,
            description: "사용자 중심의 UI로 설계된 쇼핑몰 플랫폼",
            category: "UI/UX Design",
            client: "OnlineMall Co.",
           
        },
        // 더미 데이터 추가 가능
    ]



    return (
        <section className='home-work'>
            <div className="inner">
                <div className="t-wrap">

                    <h1 className='tit'>“What We’ve Built,  <br />
                        and Why It Matters.</h1>
                    <p className='txt'>
                        당신의 아이디어를 기술로 해석하고, <br />
                        아름다운 사용자 경험으로 구현합니다.
                    </p>
                </div>
                <ul className="home-work-list">
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

export default Work