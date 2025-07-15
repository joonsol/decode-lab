import React, { useEffect, useMemo, useState } from "react";
import "./AdminNotice.scss";
import axios from "axios"
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
const AdminNotice = () => {

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

  const getFileNameFromUrl = (url) => {
    if (!url || typeof url !== "string") return null;

    const parts = url.split("/")
    const name = parts[parts.length - 1]

    return name.trim() || null
  }

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
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/notice/${id}`, {
          withCredentials: true
        })
        setNotices(notices.filter(notice => notice._id !== id))
        Swal.fire('삭제완료', '게시글이 성공적으로 석제되었습니다.', 'success')
      } catch (error) {
        console.error('삭제 실패:', error)
        Swal.fire('오류발생', '삭제중 문제 발행', 'error')

      }
    }
  }

  return (
    <div className="admin-notice">
      <h1>Notice 관리</h1>

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

        <a href="/admin/notice-create" className="add-button">
          추가하기
        </a>
      </div>

      <div className="total-count">총 {pagenatedNoticed.length}개의 게시물</div>

      <ul className="post-list">
        <li className="post-header">
          <span className="col no">번호</span>
          <span className="col title">제목</span>
          <span className="col content">내용</span>
          <span className="col views">조회수</span>
          <span className="col files">파일</span>
          <span className="col created">작성일</span>
          <span className="col updated">수정일</span>
          <span className="col actions">관리</span>
        </li>

        {pagenatedNoticed.length === 0 ? (
          <li className="post-row">
            게시글이 없습니다.
          </li>
        ) :
          (pagenatedNoticed.map((notice, index) => (
            <li key={notice._id} className="post-row">
              <span className="col no">{index + 1}</span>
              <span className="col title">{notice.title}</span>
              <span className="col content">{notice.content}</span>
              <span className="col views">{notice.views}</span>
              <span className="col files">
                {Array.isArray(notice.fileUrl) ? (
                  notice.fileUrl.map((url, i) => (
                    <button key={i}
                      onClick={() => { window.open(url, "_blank") }}
                      className="file-button">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {getFileNameFromUrl(url)}
                    </button>
                  ))
                ) : (post.fileUrl && (
                  <button
                    onClick={() => window.open(post.fileUrl, "_blank")}
                    className="none">
                    {getFileNameFromUrl(notice.fileUrl)}
                  </button>
                )
                )}
              </span>
              <span className="col created">
                {new Date(notice.createdAt).toLocaleString()}
              </span>
              <span className="col updated">
                {new Date(notice.updatedAt).toLocaleString()}
              </span>
              <span className="col actions">
                <button className="edit"
                  onClick={() => (
                    window.location.href = `/admin/notice-edit/${notice._id}`
                  )}>수정</button>
                <button className="delete" onClick={() => handleDelete(notice._id)}>삭제</button>
              </span>
            </li>
          ))
          )}
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
  );
};

export default AdminNotice;
