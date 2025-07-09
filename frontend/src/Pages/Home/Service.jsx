import React from 'react'
import homeService from "../../utils/homeService"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // 기본 스타일
import { Link, BrowserRouter } from 'react-router-dom'
import "./Service.scss"
import { useTheme } from '../../context/ThemeContext';
// 반드시 JSX 파일의 최상단에서 호출해야 함

const Service = () => {

    const { theme, toggleTheme } = useTheme();
  return (
    <section className={`home-service ${theme}` }>
      <div className="inner">
        <div className="t-wrap">

          <h1 className='tit'>service overview</h1>
          <p className='txt'>
            우리는 이런 서비스를 제공합니다.
          </p>

        </div>
        <Splide
        className='home-service-list'
          options={{
            type: "loop",         // 무한 루프
            autoplay: true,       // 자동 슬라이드
            interval: 5000,       // 5초마다 전환
            arrows: false,        // 좌우 화살표 비활성화
            perPage: 4,           // 한 화면에 5개 보이게
            perMove: 1,           // 한번에 하나씩 이동
            gap: "3rem",          // 카드 간 간격
            pauseOnFocus: true,   // 포커스 시 자동 재생 멈춤
            pagination: false,    // 점 네비게이션 숨김
            breakpoints: {        // 반응형 설정
              999: { perPage: 3, gap: "2rem" },
              480: { perPage: 1, gap: "1rem" },
            }
          }}
        >
          {homeService.map(({id, title, desc1,link}) => (
            <SplideSlide key={id}>
              <Link to={link}>
                <h4>{title}</h4>
                <p>{desc1}</p>
              </Link>
            </SplideSlide>
          ))}
        </Splide>

      </div>
    </section>
  )
}

export default Service