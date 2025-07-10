import React from 'react'
import "./ServiceHero.scss"
import { serviceIntro, serviceOverview, serviceProcess } from '../../utils/serviceData'
const ServiceHero = () => {
    return (
        <section className='service-hero sub-top-section' style={{
            backgroundImage:    `url(${serviceIntro.bg})`
        }} >
            <div className="inner">
                <div className="t-wrap">
                    <h1 className="tit">
                        {serviceIntro.title}
                    </h1>
                    <p className="txt">
                        {serviceIntro.description}
                    </p>
                </div>
            </div>
        </section >
    )
}

export default ServiceHero