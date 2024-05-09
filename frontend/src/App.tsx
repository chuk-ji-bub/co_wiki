import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { UserProvider } from './components/UserContext/UserContext';
import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';

import Mainhyun from './pages/mainhyun';


const App: React.FC = () => {
  
  return (
    <UserProvider initialUserName={null}>
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
