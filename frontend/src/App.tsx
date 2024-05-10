import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './components/UserContext/UserContext';
import { Navigate } from 'react-router-dom';
import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Userpage from './pages/userpage/index';
import Mainhyun from './pages/mainhyun';


function App() {
  
  const storedUserName = localStorage.getItem('userName');

  return (
    <UserProvider initialUserName={storedUserName}>
      <Router>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/1" element={<Mainhyun/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/userpage" element={<UserpageRoute />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

function UserpageRoute() {
  const { userName } = useUser();

  if (userName) {
    return <Userpage />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default App;
