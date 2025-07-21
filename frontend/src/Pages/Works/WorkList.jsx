import React, { useState, useEffect, useMemo } from 'react'
import "./WorkList.scss"
import thumbImg from '../../assets/thumb.png'
import { Link, BrowserRouter } from 'react-router-dom'
import axios from "axios"

const WorkList = () => {

    const [works, setWorks] = useState([])
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("title");


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

    const filteredWorks = useMemo(() => {
        return works.filter((work) => {
            const value = work[searchType]?.toLowerCase() || "";
            return value.includes(searchTerm.toLowerCase())
        })
    }, [works, searchTerm, searchType])

    const totalPages = pageSize > 0 ? Math.ceil(filteredWorks.length / pageSize) : 1;

    const pagenatedWorked = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredWorks.slice(start, start + pageSize)
    }, [filteredWorks, currentPage, pageSize])

    return (
        <section className='work-list-section'>
            <div className="inner">

                {/* 검색 및 필터 영역 */}
                <div className="controls">
                    <div className="filters">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="title">이름</option>
                            <option value="desc1">설명</option>
                        </select>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text" placeholder="검색어를 입력하세요" />

                    </div>
                    {/* 총 개수 */}
                    <div className="total-count">총 {pagenatedWorked.length}개의 Works</div>

                </div>
                <ul className="work-list">
                    {pagenatedWorked.map(({ _id, title, thumb }, i) => (

                        <li key={i}>
                            <Link to={`/works/${_id}`} style={{ backgroundImage: `url(${Array.isArray(thumb) ? thumb[0] : thumb})` }}>

                            </Link>
                        </li>
                    ))}
                </ul>
                {/* 페이지네이션 */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1 || totalPages === 0}
                    >
                        이전</button>
                    <span>
                        {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0/0"}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage >= totalPages || totalPages === 0}
                    >다음</button>
                </div>
            </div>
        </section>
    )
}

export default WorkList