import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Userpage from './pages/userpage/index';
import Mainhyun from './pages/mainhyun';
import Test from './pages/test1/test'

function App() {
  
  return (

      <Router>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/1" element={<Mainhyun/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/test" element={<Test />} />
          <Route path="/userpage" element={<Userpage />} />
        </Routes>
      </Router>

  );
};


export default App;
