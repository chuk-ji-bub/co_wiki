//Header.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // 예시: 로컬 스토리지에서 사용자 이름을 가져옴
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // 예시: 로컬 스토리지에서 사용자 이름을 제거
    localStorage.removeItem('userName');
    setUserName(null);
  };

  return (
    <div className={styles.header}>
      <div className={styles['black-nav']}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="./img/sec.png" alt="로고" style={{ width: '100px', height: '45px' }} />
          </Link>
        </div>
        {userName ? (
          <div className={styles['logout-div']}>
            {userName} <button onClick={handleLogout} className={styles['logout']}>로그아웃</button>
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
