import React, { useEffect, useMemo, useState } from 'react'
import "./AdminWork.scss"; // SCSS 파일 연결
import thumbImg from '../../assets/thumb.png'
import { Link } from 'react-router-dom';


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
  const [contacts, setContacts] = useState([])

  return (
    <div className="admin-work">
      <h1>문의 관리</h1>

      {/* 검색 및 필터 영역 */}
      <div className="controls">
        <div className="filters">
          <select>
            <option value="name">이름</option>
            <option value="email">이메일</option>
            <option value="phone">전화번호</option>
            <option value="message">문의내용</option>
          </select>
          <input type="text" placeholder="검색어를 입력하세요" />
          <select>
            <option value="all">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="in progress">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>
        <div className="pagination-size">
          <label>페이지당 표시:</label>
          <select>
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
        {homeWorks.map(({ title, thumb }, i) => (

          <li key={i}>
            <Link to={`/admin/works/${i}`} >
              <img src={thumb} alt={title} />
              <p>
                {title}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button disabled>이전</button>
        <span>1 / 1</span>
        <button disabled>다음</button>
      </div>
    </div>
  );
};

export default AdminWork;
