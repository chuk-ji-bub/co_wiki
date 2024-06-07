import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../src/pages/main/index';
import Login from './pages/login/index';
import Signup from './pages/signup/index';
import Userpage from './pages/userpage/userpage';
import Root from './pages/root/root';
import Test from './pages/test1/test';
import LeftBox from './components/left/left';
import MiddleBox from './components/middle/middle';
import RightBox from './components/right/right';
import Header from './components/Header/Header';


interface Term {
  kr: string;
  en: string;
  definition: string;
}

const App: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/root" element={<Root />} />
        <Route path="/test" element={<Test />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/main" element={
          <div className="main-container">
            <LeftBox onTermClick={handleTermClick} />
            <MiddleBox term={selectedTerm} />
            <RightBox />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
