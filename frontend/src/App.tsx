import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Userpage from './pages/userpage/userpage';
import Mainhyun from './pages/mainhyun';
import Root from './pages/root/root'

import Test from './pages/test1/test'

function App() {
  
  return (

      <Router>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/1" element={<Mainhyun/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/root" element={<Root />} />

          <Route path="/test" element={<Test />} />
          <Route path="/userpage" element={<Userpage />} />
        </Routes>
      </Router>

  );
};


export default App;
