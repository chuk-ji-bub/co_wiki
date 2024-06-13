//Header.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedProfileImage = localStorage.getItem('userProfileImage');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedProfileImage) {
      setProfileImage(`http://localhost:5000/uploads/${storedProfileImage}`);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfileImage');
    setUserName(null);
    setProfileImage(null);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={styles.header}>
      <div className={styles['black-nav']}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="./img/1.webp" alt="로고" style={{ width: '100px', height: '45px' }} />
          </Link>
        </div>
        {userName ? (
          <div className={styles['logout-div']}>
            <div className={styles['profile-container']}>
              <img
                src={profileImage || "./img/loginicon2.png"} 
                alt="Profile"
                className={styles['profile-image']}
                onClick={toggleDropdown}
              />
              <span>{userName}</span>
              {dropdownVisible && (
                <div className={styles['dropdown-menu']}>
                  <Link to="/userpage">Profile</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
                
              )}
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className={styles['login-button']}>
              <img src="./img/loginicon2.png" alt="Login" style={{ width: '50px', height: '50px' }} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
