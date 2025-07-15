import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import "./AdminNoticeEdit.scss"

const AdminNoticeEdit = () => {
  const { id } = useParams()
  const nav = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [],
    fileList: [],
    existingFileUrls: [],
  });

  const editorRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [currentUpload, setCurrentUpload] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {

    const fetchNotice = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notice/${id}`);

        setFormData((prev) => ({
          ...prev,
          title: response.data.title,
          content: response.data.content,
          existingFileUrls: response.data.fileUrl || []
        }))
      } catch (error) {
        console.error("게시글 로드 실패", error)
      }
    }
    fetchNotice()
  }, [id])



  const handleSubmit = async (e) => {
    e.preventDefault()
    const editorContent = editorRef.current.getContent()
    setShowUploadModal(true)

    try {
      const uploadedFiles = await Promise.all(
        formData.files.map(async (file) => {
          setCurrentUpload(file.name)

          const fileFormData = new FormData()
          fileFormData.append("file", file)
          fileFormData.append("originalName", encodeURIComponent(file.name))

          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/upload/file`,
            fileFormData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: percentCompleted,
                }));
              },
            }
          )

          return response.data.fileUrl
        })
      )
      const updatedFileUrls = [...formData.existingFileUrls, ...uploadedFiles];


      await axios.put(`${import.meta.env.VITE_API_URL}/api/notice/${id}`, {
        title: formData.title,
        content: editorContent,
        fileUrl: updatedFileUrls
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      setShowUploadModal(false)
      nav("/admin/notice")

    } catch (error) {

      console.error("Error creating post:", error);
      setShowUploadModal(false);
    }
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    const newFileList = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      file: file
    }))

    setFormData((prev) => ({
      ...prev,
      file: [...prev.files, ...newFiles],
      fileList: [...prev.fileList, ...newFileList]
    }))
  }
  const handleFileDelete = (fileId) => {
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

  const UploadModal = ({ progress, fileName }) => (
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
    )
  );







  return (
    <div className="admin-notice-edit">
      <div className="form-wrapper">
        <h2>게시물 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formData.content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "code", "help", "wordcount"
                ],
                toolbar: "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | image | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                images_upload_handler: async (blobInfo) => {
                  try {
                    const imageData = new FormData();
                    imageData.append("image", blobInfo.blob());
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload/image`, imageData, {
                      withCredentials: true,
                      headers: { "Content-Type": "multipart/form-data" },
                    });
                    return res.data.imageUrl;
                  } catch (err) {
                    console.error("Image upload failed:", err);
                    throw err;
                  }
                },
                automatic_uploads: true,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="files">첨부파일</label>
            <input
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />

            {/* 기존 첨부파일 표시 */}
            {formData.existingFileUrls.length > 0 && (
              <ul className="file-list">
                {formData.existingFileUrls.map((url, i) => (
                  <li key={i}>
                    <div className="file-info">
                      <p className="file-name">{decodeURIComponent(url.split("/").pop())}</p>
                      <a href={url} target="_blank" rel="noopener noreferrer">[보기]</a>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* 새로 추가된 파일 표시 */}
            {formData.fileList.length > 0 && (
              <ul className="file-list">
                {formData.fileList.map((file) => (
                  <li key={file.id}>
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                    <button type="button" onClick={() => handleFileDelete(file.id)}>삭제</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="button-group">
            <button type="submit" className="submit">저장</button>
            <button type="button" className="cancel" onClick={() => navigate("/admin/posts")}>취소</button>
          </div>
        </form>
      </div>
      <UploadModal
        progress={uploadProgress[currentUpload] || 0}
        fileName={currentUpload || ""}
      />
    </div>
  )
}

export default AdminNoticeEdit