import React from 'react'
import "./Service.scss"
import ServiceHero from './ServiceHero'
import ServiceOverview from './ServiceOverview'
import ServiceProcess from './ServiceProcess'
const Service = () => {
  return (
    <div>
      <ServiceHero />
      <ServiceProcess />
      <ServiceOverview />
    </div>
  )
}

export default Service