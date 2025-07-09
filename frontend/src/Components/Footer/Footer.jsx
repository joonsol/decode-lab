import React from 'react'
import "./Footer.scss"
import { Link, BrowserRouter } from 'react-router-dom'
import footerData from "../../utils/footerData"
import { useTheme } from '../../context/ThemeContext';
const Footer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <footer className={`${theme}`}>
      <div className="inner">
        <div className="left">
          <h3>
            <img
              src={footerData.brand[theme]?.src}
              alt={footerData.brand[theme]?.alt}
            />

          </h3>
          <p>
            {footerData.brand.alt}
          </p>
        </div>
        <ul className="right">
          <li>
            <h5>quicklink</h5>
            <ul className="foot-nav">
              {footerData.quickLinks.map(({ label, link }, i) => (
                <li key={i}>
                  <Link to={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h5>adress</h5>
            <ul className='foot-address'>
              {Object.entries(footerData.address).map(([key, value], i) => (
                <li key={i}>

                  <span>

                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h5>sns link</h5>
            <ul className='foot-sns-list'>
              {footerData.snsLinks[theme].map(({icon,link}, i) => (
                <li key={i}>
                  <Link to={link}>
                    <img src={icon} alt="" />
                  </Link>
                </li>
              ))}
            </ul>
          </li>

        </ul>
      </div>
      <div className="inner">
        <p className="copy">
          {footerData.copyright.text}
        </p>
      </div>
    </footer>
  )
}

export default Footer