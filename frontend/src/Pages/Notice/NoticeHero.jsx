import React from 'react'
import "./NoticeHero.scss"
import { noticeIntro } from '../../utils/noticeData'

const NoticeHero = () => {
    return (
        <section className=' sub-top-section' style={{
            backgroundImage: `url(${noticeIntro.bg})`
        }} >
            <div className="inner">
                <div className="t-wrap">
                    <h1 className="tit">
                        {noticeIntro.title}
                    </h1>
                    <p className="txt">
                        {noticeIntro.description}
                    </p>
                </div>
            </div>
        </section >
    )
}

export default NoticeHero