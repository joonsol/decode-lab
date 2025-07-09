import React from 'react'
import bgImg from '../../assets/home-contact-bg.png';
import "./Contact.scss"
import { useTheme } from '../../context/ThemeContext';
const Contact = () => {
  const { theme, toggleTheme } = useTheme();


  return (
    <section className={`home-contact ${theme}`}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="inner">

        <h1 className='tit'>contact</h1>
        <p className='txt'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta a ratione iure fuga unde repellendus dolorum. Officia dolores aut eos exercitationem dolorem aliquam. Facilis quidem, rem repellat deleniti provident placeat?
        </p>
        <a href="/contact" className="btn">
          contact us
        </a>
      </div>
    </section>
  )
}

export default Contact