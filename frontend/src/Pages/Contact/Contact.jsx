import React, { useState } from 'react'
import "./Contact.scss"
import ContactHero from './ContactHero'
import ContactForm from './ContactForm'

const Contact = () => {

  return (
    <div>
      <ContactHero />
      <ContactForm/>
    </div>
  )
}

export default Contact