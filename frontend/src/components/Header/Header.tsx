//Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css'; 
import { useUser } from '../UserContext/UserContext';

const Header = () => {
  const { userName, logout } = useUser();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  };

  return (
    <div className={styles.header}> {/* styles.header로 클래스를 참조합니다. */}
      <div className={styles['black-nav']}> {/* 클래스 이름에 하이픈(-)이 있는 경우 []로 감싸주어야 합니다. */}
        <div className={styles.logo}><Link to="/"><img src="./img/sec.png" alt="로고" style={{ width: '100px', height: '45px' }} /></Link></div>
        {userName ? (
          <div className={styles['logout-div']}>
            {userName} <button onClick={handleLogout} className={styles['logout']}>로그아웃</button>
          </div>
        ) : (
          <Link to="/login">
            <div className={styles['login-button']}>
            <img src="./img/loginicon2.png" alt="Login" style={{ width: '50px', height: '50px' }} /> {/* 이미지 크기 조절 */}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
