import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './userpage.css';
import Header from '../../components/Header/Header';
import { FaKey, FaBell, FaLock } from 'react-icons/fa'; // 아이콘 추가
import Modal from '../../components/modal/modal';

const Userpage: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    const userId = localStorage.getItem('userName'); // 사용자 ID 가져오기

    try {
      const response = await fetch('http://localhost:5000/api/change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // 비밀번호 변경 성공 알림
      } else {
        alert(data.error); // 비밀번호 변경 실패 알림
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }

    setIsModalOpen(false);
  };

  const handlePrivacySettingsClick = () => {
    navigate('/root'); // Privacy Settings 버튼 클릭 시 root 페이지로 이동
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
          <button onClick={handleOpenModal} className="settings-item">
            <FaKey className="settings-icon" />
            Change Password
          </button>
          <Link to="/notifications" className="settings-item">
            <FaBell className="settings-icon" />
            Notification Settings
          </Link>
          <button onClick={handlePrivacySettingsClick} className="settings-item">
            <FaLock className="settings-icon" />
            Database Settings
          </button>
        </div>
        <div className="activity-section">
          <h3>Recent Activity</h3>
          <ul className="recent-activity">
            <li>No recent activity</li>
          </ul>
        </div>
        <button onClick={() => localStorage.clear()} className="logoutButton">Logout</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleChangePassword}
      />
    </div>
  );
};

export default Userpage;
