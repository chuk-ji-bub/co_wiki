import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { FaSignInAlt, FaUserCircle, FaCaretDown } from 'react-icons/fa'; // 아이콘 추가

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 추가

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles['black-nav']}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="./img/1.webp" alt="로고" className={styles.logoImage} />
          </Link>
        </div>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </div>
        <div className={styles.userSection}>
          {userName ? (
            <>
              <div className={styles.userDropdown} onClick={toggleDropdown}>
                <FaUserCircle className={styles.userIcon} />
                <span className={styles.userName}>{userName}</span>
                <FaCaretDown className={styles.caretIcon} />
              </div>
              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/userpage" className={styles.dropdownItem}>User Page</Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <div className={styles.loginButton}>
                <FaSignInAlt size={24} />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
