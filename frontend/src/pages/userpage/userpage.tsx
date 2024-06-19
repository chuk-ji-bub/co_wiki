import React, { useState, useEffect, ChangeEvent } from 'react';
import './userpage.css';
import Header from '../../components/Header/Header';

const UserPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const userId = localStorage.getItem('userName'); // 실제 사용자 ID로 교체 필요
      if (userId) {
        formData.append('user_id', userId);
      }

      try {
        const response = await fetch('http://localhost:5000/api/upload_profile', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          alert('Profile image uploaded successfully');
          localStorage.setItem('userProfileImage', data.filepath);
          window.location.reload();
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error uploading profile image:', error);
        alert('Profile image upload failed');
      }
    }
  };

  return (
    <div className="header"><Header/>
    <div className="user-page">
      <h1>{userName ? `어서오세요, ${userName}님` : 'Upload Profile Image'}</h1>
      <div className="file-upload-container">
        {preview && <img src={preview} alt="Image Preview" className="image-preview" />}
        <div className="button-container">
          <input type="file" id="file-upload" onChange={handleFileChange} />
          <label htmlFor="file-upload">사진변경</label>
          <button onClick={handleUpload}>올리기</button>
          <a href="http://localhost:3000/root" className="db-access-button">DB 접근</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserPage;
