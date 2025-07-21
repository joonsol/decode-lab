import WorkHero from './WorkHero'
import thumbImg from '../../assets/thumb.png'
import "./WorkItem.scss"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, replace, useNavigate, useParams } from "react-router-dom";
const WorkItem = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    desc1: "",
    desc2: "",
    client: "",
    category: "",
    thumb: "",
    link: "",
    files: [],
    fileList: [],
  });
  // id와 일치하는 항목 찾기
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/work/${id}`);

        const data = response.data;

        setFormData((prev) => ({
          ...prev,
          title: data.title,
          desc1: data.desc1,
          desc2: data.desc2,
          client: data.client,
          category: data.category,
          thumb: data.thumb, // 이미지 URL 배열
          link: data.link,
          files: [],
          fileList: [], // 이미 업로드된 썸네일은 미리보기로 보여줄 수도 있음
        }));
      } catch (error) {
        console.error("작업 데이터 불러오기 실패", error);
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);



  // i==id? return item : return "";
  if (!formData) return <div>프로젝트를 찾을 수 없습니다.</div>;


  return (


    <div>
      <WorkHero />
      <section className='work-item'>

        <div className="inner">
          <button onClick={() => navigate(-1)} >
            뒤로가기
          </button>
          <div className="dep1">

            <div className="img-wrap"
              style={{
                backgroundImage: `url(${formData.thumb})`  // ✅ 올바른 key
              }}
            >
            </div>
            <div className="t-wrap">

              <h1 className='sub-tit'>{formData.title}</h1>
              <p className='sub-txt'>{formData.desc1}</p>
              <p className='sub-txt2'>{formData.desc2}</p>
              <p className='sub-txt3'>
                <span>

                  {formData.category}
                </span>
                <span>
                  {formData.client}

                </span>
              </p>
              <a href={formData.link} className='sub-btn btn' target='_blank'>
                project view
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorkItem