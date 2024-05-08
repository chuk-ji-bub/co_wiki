import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/main';

import Mainhyun from './pages/mainhyun';
import Maininsung from '../src/pages/login/index';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/1" element={<Mainhyun/>} />
          <Route path="/2" element={<Maininsung />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
