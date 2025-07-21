import React, { useState, useEffect, useMemo } from 'react'

import thumbImg from '../../assets/thumb.png'
import { Link, BrowserRouter } from 'react-router-dom'
import "./Work.scss"
import axios from "axios"
const Work = () => {

    const [works, setWorks] = useState([])
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/work`)
                setWorks(response.data)
            } catch (error) {
                console.log("게시글 가져오기 실패", error)
            }
        }
        fetchWorks()
    }, [])


    return (
        <section className='home-work'>
            <div className="inner">
                <div className="t-wrap">

                    <h1 className='tit'>“What We’ve Built,  <br />
                        and Why It Matters.</h1>
                    <p className='txt'>
                        당신의 아이디어를 기술로 해석하고, <br />
                        아름다운 사용자 경험으로 구현합니다.
                    </p>
                    <a href="/works" className="link">더보기</a>
                </div>
                <ul className="home-work-list">
                    {works.map(({ title, thumb ,_id},i) => (

                        <li key={_id} alt={title}  >
                            <Link to={`/works/${_id}`}  style={{ backgroundImage: `url(${Array.isArray(thumb) ? thumb[0] : thumb})` }}>
                            {/* <img src={thumb} /> */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Work