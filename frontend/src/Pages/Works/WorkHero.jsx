import React from 'react'
import "./WorkHero.scss"
import {worksIntro} from "../../utils/worksData"
const WorkHero = () => {
  return (
          <section className=' sub-top-section' style={{
              backgroundImage:    `url(${worksIntro.bg})`
          }} >
              <div className="inner">
                  <div className="t-wrap">
                      <h1 className="tit">
                          {worksIntro.title}
                      </h1>
                      <p className="txt">
                          {worksIntro.description}
                      </p>
                  </div>
              </div>
          </section >
  )
}

export default WorkHero