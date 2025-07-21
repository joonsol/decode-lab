import "./AdminPosts.scss"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminPosts = () => {
   const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-token`,
          {}, // POST이므로 body 필요. 빈 객체라도 전달
          {
            withCredentials: true, // ✅ 쿠키 전송 필수
          }
        );
        console.log("토큰 유효 ✅", response.data);
      } catch (error) {
        console.error("❌ 토큰 인증 실패", error);
        navigate("/admin/login"); // 실패 시 로그인 페이지로
      }
    };

    checkToken();
  }, []);

  return (
    <div>AdminPosts</div>
  )
}

export default AdminPosts