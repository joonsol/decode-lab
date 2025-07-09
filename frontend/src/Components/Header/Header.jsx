import React, { useState, useEffect } from 'react'
import "./Header.scss"
import { Link, useLocation } from 'react-router-dom'
import { headerConfig } from '../../utils/header'
import { useTheme } from '../../context/ThemeContext';
const MenuItem = ({ label, link, onClick }) => (

  <li >
    <Link to={link} onClick={onClick}>
      {label}
    </Link>
  </li>
)
const Header = () => {

  const { theme, toggleTheme } = useTheme();
  const [mode] = useState("dark")
  const [isOpen, setIsOpen] = useState(false)

  const location = useLocation()
  const openMenu = () => setIsOpen(true)
  const closeMenu = () => setIsOpen(false)

  const [isScolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handScroll = () => {

      setIsScrolled(window.scrollY > 0)
    }
    handScroll()
    window.addEventListener('scroll', handScroll)
    return () => window.removeEventListener('scroll', handScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [location])
  return (
    <header className={`header ${theme} ${isScolled ? "scrolled" : ""}`}>
      <div className="inner">
        <h2 className="logo">
          <Link >
            <img
              src={headerConfig.logo[theme]?.src}
              alt={headerConfig.logo[theme]?.alt}
            />
          </Link>
        </h2>
        <nav>
          <ul className='dsk-nav'>
            {headerConfig.menu.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </ul>
          <div className={`mob-wrap ${isOpen ? "open" : ""}`}>

            <a href="#" className="mob-btn" onClick={(e) => {
              e.preventDefault()
              isOpen ? closeMenu() : openMenu()
            }}>
              <span></span>
              <span></span>
              <span></span>
            </a>
            <ul className='mob-nav'>
              {headerConfig.menu.map((item) => (
                <MenuItem key={item.label} {...item} />
              ))}
            </ul>

          </div>
          <button className='mode-btn' onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header