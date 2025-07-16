import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminWorkCreate.scss";

const AdminWorkCreate = () => {
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

  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const UploadModal = ({ progress, fileName }) =>
    showUploadModal && (
      <div className="upload-modal">
        <div className="modal-box">
          <h3>파일 업로드 중...</h3>
          <p>{fileName}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="progress-text">{progress.toFixed(0)}%</div>
          </div>
        </div>
      </div>
    );

const handleSubmit = async (e) => {
  e.preventDefault();
  setShowUploadModal(true);

  try {
    const fileFormData = new FormData();

    // ✅ 여러 파일을 하나의 FormData에 동일한 키("image")로 append
    formData.files.forEach((file) => {
      fileFormData.append("image", file);
    });

    // ✅ 한번에 업로드 (서버에서 array('image')로 받기 때문)
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/upload/work-image`,
      fileFormData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress({ total: percentCompleted }); // 간단하게 전체 진행률 표시
        },
      }
    );

    const uploadedFiles = response.data.imageUrls; // ✅ 서버에서 받은 URL 배열

    // ✅ 작업 데이터 저장
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/work`,
      {
        title: formData.title,
        desc1: formData.desc1,
        desc2: formData.desc2,
        client: formData.client,
        category: formData.category,
        thumb: uploadedFiles, // ✅ 배열 형태로 저장
        link: formData.link,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    // ✅ 완료 후 처리
    setShowUploadModal(false);
    navigate("/admin/works");
  } catch (error) {
    console.error("Error creating work:", error);
    setShowUploadModal(false);
  }
};


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.files.length + files.length > 3) {
      alert("최대 3개의 이미지만 업로드할 수 있습니다.");
      return;
    }



    const newFileList = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
      fileList: [...prev.fileList, ...newFileList],
    }));
  };

  const handleFileDelete = (fileId) => {
    const target = formData.fileList.find((f) => f.id === fileId);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);

    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => prev.fileList[i].id !== fileId),
      fileList: prev.fileList.filter((file) => file.id !== fileId),
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="admin-notice-create">
      <div className="form-wrapper">
        <h2>새 게시물 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc1">설명글 1</label>
            <textarea
              id="desc1"
              value={formData.desc1}
              onChange={(e) => setFormData({ ...formData, desc1: e.target.value })}
              rows={5}
              placeholder="간단한 설명을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="desc2">설명글 2</label>
            <textarea
              id="desc2"
              value={formData.desc2}
              onChange={(e) => setFormData({ ...formData, desc2: e.target.value })}
              rows={5}
              placeholder="추가 설명이 있다면 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="client">클라이언트</label>
            <input
              type="text"
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">프로젝트 링크</label>
            <input
              type="text"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="files">썸네일 이미지</label>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {formData.fileList.length > 0 && (
            <ul className="file-list">
              {formData.fileList.map((file) => (
                <li key={file.id}>
                  <div className="file-info">
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      style={{ width: "100px", borderRadius: "6px" }}
                    />
                    <div className="file-meta">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleFileDelete(file.id)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="button-group">
            <button type="submit" className="submit">저장</button>
            <button type="button" className="cancel" onClick={() => navigate("/admin/works")}>취소</button>
          </div>
        </form>
      </div>

      <UploadModal
        progress={uploadProgress[currentUpload] || 0}
        fileName={currentUpload || ""}
      />
    </div>
  );
};

export default AdminWorkCreate;
