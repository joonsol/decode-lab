import React, { useEffect, useRef,useLayoutEffect } from "react";
import videoBg1 from '../../assets/1.mp4'
import videoBg2 from '../../assets/2.mp4'
import gsap from "gsap";
import "./Hero.scss"
import { useTheme } from '../../context/ThemeContext';
const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef  = useRef(null);
  const btnRef   = useRef(null);
    const { theme, toggleTheme } = useTheme();
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(
      [titleRef.current, textRef.current, btnRef.current],
      {
        y: 30,
        autoAlpha: 0,         // opacity 0 + visibility hidden
        duration: 1,
        ease: "power3.out",
        stagger: 0.3          // h1 → p → button 순
      }
    );
  }, heroRef);

  return () => ctx.revert();
}, []);
  return (
    <section className={`home-hero ${theme}`}  ref={heroRef}>
      <video autoPlay muted loop >

    <source
      src={theme === "light" ? videoBg2 :videoBg1}
      type="video/mp4"
    />
  </video>
      <div className="inner">
        <div className="t-wrap">
        <h1 ref={titleRef} className="tit">
          Decoding Ideas,<br />Designing Experience
        </h1>

        <p ref={textRef} className="txt">
          기술로 해석하고, 경험으로 구현합니다.
        </p>

        <a href="/contact" ref={btnRef} className="btn">
         <span> CONTACT US</span>
        </a>
        </div>
      </div>
    </section>
  )
}

export default Hero