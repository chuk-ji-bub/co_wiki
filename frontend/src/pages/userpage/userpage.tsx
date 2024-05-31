import React, { useState } from 'react';
import './userpage.css';

const UserPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

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
    <div className="user-page">
      <h1>Upload Profile Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UserPage;
