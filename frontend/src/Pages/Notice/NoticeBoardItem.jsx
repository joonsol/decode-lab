import React, { useState, useEffect } from 'react'
import "./NoticeBoardItem.scss"
import { useNavigate, Link, useParams } from 'react-router-dom';
import NoticeHero from './NoticeHero';
import axios from 'axios';
const NoticeBoardItem = () => {
    // const dummyPosts = [
    //     {
    //         number: 1,
    //         title: "리액트 게시판 구현하기",
    //         views: 135,
    //         createdAt: "2025-07-09T14:22:00Z",
    //         content: "React와 React Router를 이용해 게시판 목록과 상세 페이지를 구현하는 예제입니다.",
    //     },
    //     {
    //         number: 2,
    //         title: "Material UI 아이콘 사용법",
    //         views: 92,
    //         createdAt: "2025-07-08T10:05:00Z",
    //         content: "Material UI의 아이콘을 프로젝트에 어떻게 적용하는지 설명합니다. 특히 VisibilityIcon 사용 예제를 포함합니다.",
    //     },
    //     {
    //         number: 3,
    //         title: "날짜 포맷 처리하기 (date-fns)",
    //         views: 78,
    //         createdAt: "2025-07-07T08:45:00Z",
    //         content: "`date-fns`를 이용해 날짜를 `yyyy-MM-dd HH:mm:ss` 형식으로 포맷하는 방법을 알아봅니다.",
    //     },
    //     {
    //         number: 4,
    //         title: "SCSS로 컴포넌트 스타일링",
    //         views: 61,
    //         createdAt: "2025-07-06T13:15:00Z",
    //         content: "SCSS를 활용해 컴포넌트 스타일을 모듈화하고 유지 보수하기 쉽게 구성하는 방법을 다룹니다.",
    //     },
    //     {
    //         number: 5,
    //         title: "게시판 페이지네이션 구현",
    //         views: 108,
    //         createdAt: "2025-07-05T17:40:00Z",
    //         content: "React에서 페이지네이션 기능을 구현해 게시글을 여러 페이지로 나누어 보여주는 실습 예제입니다.",
    //     },
    // ];
    const { id } = useParams()
    const nav=useNavigate()
    const [notice, setNotice] = useState({
        title: "",
        content: "",
        fileUrl: [],
        viewLogs: 0,
        number: 0,
        views: 0,
        createdAt: ""

    });

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notice/${id}`)
                const data = response.data
                setNotice({
                    title: data.title,
                    content: data.content,
                    fileUrl: data.fileUrl,
                    viewLogs: data.viewLogs,
                    views: data.views,
                    createdAt: data.createdAt,
                    number: data.number
                })
            } catch (error) {
                console.log("게시글 가져오기 실패", error)
            }
        }
        fetchNotice()
    }, [])


    // i==id? return item : return "";
    if (!notice) return <div>프로젝트를 찾을 수 없습니다.</div>;

    return (

        <div>
            <NoticeHero />
            <section className='notice-board-item'>

                <div className="inner">
                    <div className="notice-board-wrap">

                        <div className="post-top shadow">
                            <span className="number">
                                {notice.number}
                            </span>
                            <span className="tit">
                                {notice.title}
                            </span>
                            <div className="right">

                                <span className="views">

                                    {notice.views}
                                </span>
                                <span className="date">
                                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ""}
                                </span>
                            </div>
                        </div>
                        <p
                            className='post-content shadow'
                            dangerouslySetInnerHTML={{ __html: notice.content }}
                        >


                        </p>
                        <button onClick={() => nav(-1)} className="go-back-btn ">
                            ← 뒤로가기
                        </button>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default NoticeBoardItem