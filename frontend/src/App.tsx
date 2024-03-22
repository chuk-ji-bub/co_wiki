import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChessBoardPage from './pages/ChessBoardPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* 여기에 네비게이션 바나 공통 레이아웃 컴포넌트를 추가할 수 있습니다 */}
        <Routes>
          <Route path="/chess" element={<ChessBoardPage />} />
          <Route path="/MainPage" element={<MainPage />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
