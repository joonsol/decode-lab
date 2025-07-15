import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminNavbar.scss"; // SCSS 파일 연결

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      if(response.status===200){
        navigate("/admin")
      }
    } catch (error) {

      console.log("로그아웃 실패:",error)
    }
  }
  return (
    <nav className="admin-navbar">
      <div className="inner">
        <div className="logo">
          <Link to="/admin/posts" className="logo-text">
            관리자 페이지
          </Link>
        </div>
        <div className="nav-links desktop">
          <Link to="/admin/notice">notice</Link>
          <Link to="/admin/works">works</Link>
          <Link to="/admin/contact">contact</Link>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
        <div className="mobile-toggle">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="nav-links mobile">
            <Link to="/admin/notice" onClick={() => setIsOpen(false)}>notice</Link>
            <Link to="/admin/works" onClick={() => setIsOpen(false)}>works</Link>
            <Link to="/admin/contact" onClick={() => setIsOpen(false)}>contact</Link>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default AdminNavbar