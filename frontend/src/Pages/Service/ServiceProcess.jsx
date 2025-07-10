import React from 'react'
import "./ServiceProcess.scss"
import { serviceProcess } from '../../utils/serviceData'
const ServiceProcess = () => {
    return (
        <section className='service-process' >
            <div className="inner">
                <div className="t-wrap">
                    <h1 className="sub-tit">
                        {serviceProcess.title}
                    </h1>
                    <p className="sub-txt">
                        {serviceProcess.desc}
                    </p>
                </div>
                <ul className="service-list">
                    {serviceProcess.process.map(({ step, title, desc }, i) => (
                        <li key={i}>
                            <div className="front">
                                <h6>
                                    <span className='num'> {i + 1}</span>   {step}
                                </h6>
                                <p>
                                    {title}
                                </p>
                            </div>
                            <div className="back">
                                <p>
                                    {desc}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default ServiceProcess