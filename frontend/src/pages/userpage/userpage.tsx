import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userpage.css';
import Header from '../../components/Header/Header';
import { FaKey, FaBell, FaLock } from 'react-icons/fa'; // 아이콘 추가

const Userpage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    // 예시: 로컬 스토리지 또는 서버에서 사용자 정보 가져오기
    const storedUserName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('email');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <Header />
      <div className="userpage-container">
        <div className="profile-section">
          <div className="profile-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-placeholder">No Image</div>
            )}
            <input type="file" onChange={handleProfileImageChange} />
          </div>
          <h2>{userName}</h2>
          <p>{email}</p>
        </div>
        <div className="settings-section">
          <h3>Account Settings</h3>
          <Link to="/change-password" className="settings-item">
            <FaKey className="settings-icon" />
            Change Password
          </Link>
          <Link to="/notifications" className="settings-item">
            <FaBell className="settings-icon" />
            Notification Settings
          </Link>
          <Link to="/privacy" className="settings-item">
            <FaLock className="settings-icon" />
            Privacy Settings
          </Link>
        </div>
        <div className="activity-section">
          <h3>Recent Activity</h3>
          <p>No recent activity</p>
        </div>
        <button onClick={() => localStorage.clear()}>Logout</button>
      </div>
    </div>
  );
};

export default Userpage;
