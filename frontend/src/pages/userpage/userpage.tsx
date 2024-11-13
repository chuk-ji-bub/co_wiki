import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './userpage.css';

interface ChatRecord {
  sender: string;
  message: string;
  timestamp: string;
}

const UserPage: React.FC = () => {
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 관리자 상태 확인
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    console.log(`[UserPage] localStorage isAdmin: ${adminStatus}`);
    setIsAdmin(adminStatus);

    // 챗봇 대화 기록 가져오기
    fetch('http://localhost:5000/api/chat_records')
      .then((res) => res.json())
      .then((data) => setChatRecords(data))
      .catch((error) => console.error('Error fetching chat records:', error));
  }, []);

  const handleNavigateToRoot = () => {
    if (isAdmin) {
      console.log('[UserPage] Navigating to /root - Admin access granted');
      navigate('/root');
    } else {
      console.log('[UserPage] Access denied - Admin only');
      alert('권한이 없습니다. 관리자만 접근할 수 있습니다.');
    }
  };

  return (
    <div className="userpage-container">
      <h1>환영합니다!</h1>

      {/* 관리자 여부에 따라 DB 관리 페이지 링크 표시 */}
      {isAdmin ? (
        <Link to="/root" className="db-button">DB 관리 페이지로 이동</Link>
      ) : (
        <button onClick={handleNavigateToRoot} className="db-button disabled">
          DB 관리 페이지로 이동 (권한 필요)
        </button>
      )}

      {/* 챗봇 대화 기록 */}
      {/* <div className="chat-records">
        <h2>챗봇 대화 기록</h2>
        {chatRecords.map((record, index) => (
          <div key={index} className="chat-record">
            <strong>{record.sender}</strong>: {record.message} <em>{record.timestamp}</em>
          </div>
        ))}
      </div> */}

      {/* 새로운 콘텐츠 영역 */}
      <div className="new-section">
        <h2>새로운 콘텐츠 영역</h2>
        <p>이곳에 새로운 기능이나 콘텐츠를 추가할 수 있습니다.</p>
      </div>
    </div>
  );
};

export default UserPage;
