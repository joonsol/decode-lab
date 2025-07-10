import React from 'react'
import "./ServiceOverview.scss"
import { serviceOverview } from '../../utils/serviceData'

const ServiceOverview = () => {
  return (
    <section className='service-overview'>
      <div className="inner">
        <div className="t-wrap">
          <h1 className="sub-tit">
            {serviceOverview.title}
          </h1>
          <p className="sub-txt">
            {serviceOverview.desc}
          </p>
        </div>
        <ul className="service-over-list">
          {serviceOverview.overview.map(({ id, title, slogan, desc1, desc2 ,bg}) => (
            <li key={id}>
              <div className="img-wrap"
              >
                <div className="bg"
                style={{backgroundImage:`url(${bg})`}}
                
                >

                </div>
              </div>
              <div className="t-wrap">
                <div className="slogan">
                  {title}
                </div>
                <h4>
                   {desc1.map((item) => (
                    <span>
                      {item}
                    </span>
                  ))}
                </h4>
                <ul className="sub-list">
                  {desc2.map((item) => (
                    <li>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ServiceOverview