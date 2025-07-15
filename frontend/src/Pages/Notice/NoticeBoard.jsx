import React, { useEffect, useMemo, useState } from 'react'
import "./NoticeBoard.scss"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
const NoticeBoard = () => {

    const nav = useNavigate()

    const [notices, setNotices] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("title");
    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notice`)
                setNotices(response.data)
            } catch (error) {
                console.log("게시글 가져오기 실패", error)
            }
        }
        fetchNotice()
    }, [])


    const filteredNotices = useMemo(() => {
        return notices.filter((notice) => {
            const value = notice[searchType]?.toLowerCase() || "";
            return value.includes(searchTerm.toLowerCase())
        })
    }, [notices, searchTerm, searchType])
    const totalPages = pageSize > 0 ? Math.ceil(filteredNotices.length / pageSize) : 1;

    const pagenatedNoticed = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredNotices.slice(start, start + pageSize)
    }, [filteredNotices, currentPage, pageSize])

    return (
        <section className='notice-board'>
            <div className="inner">
                <div className="controls">
                    <div className="filters">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="name">제목</option>
                            <option value="content">글 내용</option>
                        </select>
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="검색어를 입력하세요" />
                    </div>


                </div>
                <ul className="notice-board-list">
                    {pagenatedNoticed.map(({_id, number, title, views }) => (
                        <li key={_id}>
                            <Link to={`/notice/${_id}`} className='shadow'>
                                <span className="number">
                                    {number}
                                </span>
                                <h4>{title}</h4>
                                <span className='views'>
                                    {views}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
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

export default NoticeBoard