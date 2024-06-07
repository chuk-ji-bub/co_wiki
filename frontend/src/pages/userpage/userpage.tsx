import React, { useState, useEffect } from 'react';
import './userpage.css';

const UserPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedProfileImage = localStorage.getItem('userProfileImage');
    const storedRole = localStorage.getItem('userRole');

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedProfileImage) {
      setProfileImage(`http://localhost:5000/uploads/${storedProfileImage}`);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const userId = localStorage.getItem('userName'); // 실제 사용자 ID로 교체 필요
      formData.append('user_id', userId as string);

      try {
        const response = await fetch('http://localhost:5000/api/upload_profile', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          alert('Profile image uploaded successfully');
          localStorage.setItem('userProfileImage', data.filepath);
          setProfileImage(`http://localhost:5000/uploads/${data.filepath}`);
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
    <div className="user-page">
      <h1>사용자 프로필</h1>
      <div className="profile-container">
        <img src={profileImage || './img/default-profile.png'} alt="Profile" className="profile-image" />
        <div className="user-info">
          <p>이름: {userName}</p>
          <p>역할: {role}</p>
        </div>
      </div>
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UserPage;
