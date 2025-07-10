import React from 'react'
import "./ContactHero.scss"
import { contactIntro } from '../../utils/contactData'
const ContactHero = () => {
  return (
           <section className=' sub-top-section' style={{
               backgroundImage:    `url(${contactIntro.bg})`
           }} >
               <div className="inner">
                   <div className="t-wrap">
                       <h1 className="tit">
                           {contactIntro.title}
                       </h1>
                       <p className="txt">
                           {contactIntro.description}
                       </p>
                   </div>
               </div>
           </section >
  )
}

export default ContactHero