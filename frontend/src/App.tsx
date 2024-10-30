import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import Login from './pages/login/index'; 
import Userpage from './pages/userpage/userpage';
import Root from './pages/root/root';
import Header from './components/Header/Header';
import About from './pages/about/about';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);


  // console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // 로컬 스토리지 초기화
    setIsAuthenticated(false); // 인증 상태 false로 설정
    setUserName(null); // 유저 이름 초기화
  };

  // 환경 변수에서 클라이언트 ID 가져오기
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('Google Client ID가 설정되지 않았습니다.');
    return <div>Google Client ID가 필요합니다.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Header 
          isAuthenticated={isAuthenticated} 
          userName={userName} 
          handleLogout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route 
            path="/login" 
            element={
              <Login 
                setIsAuthenticated={setIsAuthenticated} 
                setUserName={setUserName} 
              />
            } 
          />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/about" element={<About />} />
          <Route path="/root" element={<Root />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
