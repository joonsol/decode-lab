import React from 'react'
import "./Home.scss"
import Hero from "./Hero"
import Contact from './Contact'
import Work from './Work'
import Service from './Service'
const Home = () => {
    return (
        <div>
            <Hero/>
            <Service/>
            <Work/>
            <Contact/>
        </div>
    )
}

export default Home