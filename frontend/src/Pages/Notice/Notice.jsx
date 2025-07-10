import React from 'react'
import "./Notice.scss"
import NoticeHero from './NoticeHero'
import NoticeBoard from './NoticeBoard'
const Notice = () => {
  return (
    <div>
      <NoticeHero />
      <NoticeBoard/>
    </div>
  )
}

export default Notice