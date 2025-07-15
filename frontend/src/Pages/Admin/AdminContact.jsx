import React, { useEffect, useState, useMemo } from "react";
import "./AdminContact.scss"; // SCSS 파일 연결
import axios from "axios"
import Swal from "sweetalert2"
const AdminContact = () => {


  const [contacts, setContacts] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedContact, setSelectedContact] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("name")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, {
          withCredentials: true
        })
        setContacts(response.data)

      } catch (error) {
        console.log("문의글 가져오기 실패", error)
      }

    }
    fetchContacts()
  }, [])


  const getStatusClass = (status) => {
    switch (status) {
      case "대기중":
        return "status pending";
      case "진행중":
        return "status progress";
      case "완료":
        return "status completed";
      default:
        return "status";
    }
  };


  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const value = (contact[searchType] || "").toLowerCase();
      const matchesSearch = value.includes(searchTerm.toLowerCase())
      const matchsStatus = statusFilter === "all" || contact.status === statusFilter;
      return matchesSearch && matchsStatus
    })
  }, [contacts, searchTerm, searchType, statusFilter])


  const totalPages = Math.ceil(filteredContacts.length / pageSize)

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize)
  }, [filteredContacts, currentPage, pageSize])


const handleStatusUpdate = async (contactId, newStatus) => {
  try {
    // 1. 서버에 상태 업데이트 요청
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/contact/${contactId}`,
      { status: newStatus },
      { withCredentials: true }
    );

    // 2. 클라이언트 상태 업데이트 (항상 최신 상태 기준으로)
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact._id === contactId
          ? { ...contact, status: newStatus }
          : contact
      )
    );

    // ✅ 3. 상태 필터 및 검색어 초기화
    setStatusFilter("all");
    setSearchTerm(""); // ← 이 줄이 없으면 filteredContacts가 계속 비어 있음

    // 4. 성공 메시지
    Swal.fire("수정완료", "상태가 성공적으로 수정되었습니다.", "success");
  } catch (error) {
    console.error("수정 실패", error);
    Swal.fire("오류발생", "수정 중 문제가 발생했습니다.", "error");
  }
};


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, {
          withCredentials: true
        })

        setContacts(prev => prev.filter(contact => contact._id !== id))

        Swal.fire("삭제완료", "문의가 성공적으로 삭제되었습니다.", "success")
      } catch (error) {
        console.log("수정실패", error)
        Swal.fire("오류 발생", "수정 중 문제가 발생했습니다.", "error")

      }
    }
  }


  const showStatusChangeModal = async (contact) => {
    setSelectedContact(contact)

    const { value: newStatus, isConfirmed } = await Swal.fire({
      title: "문의 상태 수정",
      input: "radio",
      inputOptions: {
        pending: "대기중",
        progress: "진행중",
        completed: "완료",
      },
      inputValue: contact.status,
      confirmButtonText: "적용하기",
      cancelButtonText: "취소",
      showCancelButton: true,
    })
    if (isConfirmed && newStatus) {
      handleStatusUpdate(contact._id, newStatus)
    }

          console.log("🔁 contacts:", contacts.status);
      console.log("🔍 filteredContacts:", filteredContacts);
      console.log("📌 statusFilter:", statusFilter);

  }
  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "대기중";
      case "progress":
        return "진행중";
      case "completed":
        return "완료";
      default:
        return status;
    }
  };
  return (
    <div className="admin-contacts">
      <h1>문의 관리</h1>

      {/* 검색 및 필터 영역 */}
      <div className="controls">
        <div className="filters">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">이름</option>
            <option value="email">이메일</option>
            <option value="phone">전화번호</option>
            <option value="message">문의내용</option>
          </select>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text" placeholder="검색어를 입력하세요" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="progress">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>
        <div className="pagination-size">
          <label>페이지당 표시:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>{`${num}개`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 총 개수 */}
      <div className="total-count">총 {contacts.length}개의 문의</div>

      {/* 리스트로 변환된 문의 목록 */}
      <ul className="contact-list">
        <li className="contact-header">
          <span className="col no">번호</span>
          <span className="col name">이름</span>
          <span className="col email">이메일</span>
          <span className="col phone">휴대폰</span>
          <span className="col message">문의 내용</span>
          <span className="col status">상태</span>
          <span className="col actions">관리</span>
        </li>
        {paginatedContacts.map((contact, index) => (
          <li key={index} className="contact-row">
            <span className="col no">{index + 1}</span>
            <span className="col name">{contact.name}</span>
            <span className="col email">{contact.email}</span>
            <span className="col phone">{contact.phone}</span>
            <span className="col message">{contact.message}</span>
            <span className={`col status ${contact.status}`}
            >
              {translateStatus(contact.status)}
            </span>
            <span className="col actions">
              <button className="edit"
                onClick={() => showStatusChangeModal(contact)}
              >수정</button>
              <button className="delete"
                onClick={() => handleDelete(contact._id)}
              >삭제</button>
            </span>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}>이전</button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p => p + 1))}
          disabled={currentPage === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default AdminContact;
