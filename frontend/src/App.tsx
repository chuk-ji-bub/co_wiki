import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/index';
import Login from './pages/login/index'; 
import Userpage from './pages/userpage/userpage';
import Root from './pages/root/root';

import LeftBox from './components/left/left';
import MiddleBox from './components/middle/middle';
import RightBox from './components/right/right';
import Header from './components/Header/Header';
import About from './pages/about/about';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserName(null);
  };

  return (
    <GoogleOAuthProvider clientId="709327209190-g4veopnsbj84rf4nuoud57elbtlbfnsd.apps.googleusercontent.com">
      <Router>
        <Header isAuthenticated={isAuthenticated} userName={userName} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserName={setUserName} />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
