import React, { useEffect, useMemo, useState } from 'react'
import "./AdminWork.scss"; // SCSS 파일 연결
import thumbImg from '../../assets/thumb.png'
import { Link } from 'react-router-dom';

import axios from "axios"
import Swal from "sweetalert2";

const AdminWork = () => {
  const homeWorks = [
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
    {
      title: "Responsive Portfolio Site",
      thumb: thumbImg,
      desc1: "반응형 웹 포트폴리오 사이트",
      desc2: "다양한 해상도에 최적화된 반응형 구조로 제작된 포트폴리오 사이트입니다. 사용자 경험과 시각적 완성도를 고려하여 디자인과 퍼블리싱을 진행했습니다.",
      category: "Web Design",
      client: "Brand X",
      link: ""
    },
    {
      title: "E-commerce Platform",
      thumb: thumbImg,
      desc1: "UI 중심의 쇼핑몰 플랫폼",
      desc2: "사용자의 구매 흐름을 고려한 정보 구조와 직관적인 UI/UX 설계를 바탕으로 한 쇼핑몰 플랫폼입니다. 상품 탐색부터 결제까지의 과정을 원활하게 설계했습니다.",
      category: "UI/UX Design",
      client: "OnlineMall Co.",
      link: ""
    },
  ];
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
  const getFileNameFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;

    const parts = url.split("/")
    const name = parts[parts.length - 1]

    return name.trim() || null
  }

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/work/${id}`, {
          withCredentials: true
        })
        setWorks(works.filter(work => work._id !== id))
        Swal.fire('삭제완료', '게시글이 성공적으로 석제되었습니다.', 'success')
      } catch (error) {
        console.error('삭제 실패:', error)
        Swal.fire('오류발생', '삭제중 문제 발행', 'error')

      }
    }
  }



  return (
    <div className="admin-work">
      <h1>포트폴리오 관리</h1>

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
        <a href="/admin/works-create" className="add-button">
          추가하기
        </a>
      </div>

      {/* 총 개수 */}
      <div className="total-count">총 {pagenatedWorked.length}개의 Works</div>

      {/* 리스트로 변환된 문의 목록 */}
      <ul className="work-list">
        {pagenatedWorked.map((work, index) => (

          <li key={work._id}>
            <Link to={`/admin/works-edit/${work._id}`} >
              <h2>
                <span>{index+1} </span>
                {work.title}</h2>
              <div className="img-wrap">
             
             {Array.isArray(work.thumb)?(
              work.thumb.map((imgUrl, idx)=>(
                <img key={idx} src={imgUrl} alt={`work.title image ${idx+1}`} />
                
              ))
            ):(
               <img  src={work.thumb} alt={work.title} />

             )}
              </div>
              <p>
                {work.desc1}
              </p>
            </Link>
            <button className="edit"
              onClick={() => (
                window.location.href = `/admin/works-edit/${work._id}`
              )}>수정</button>
            <button className="delete" onClick={() => handleDelete(work._id)}>삭제</button>
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
  );
};

export default AdminWork;
