import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext/UserContext';
import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';

import Mainhyun from './pages/mainhyun';


const App: React.FC = () => {
  
  const storedUserName = localStorage.getItem('userName');

  return (
    <UserProvider initialUserName={storedUserName}>
      <Router>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/1" element={<Mainhyun/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
