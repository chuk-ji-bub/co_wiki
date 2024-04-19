import React from 'react';

import MiddleBox from '../components/middle'; // MiddleBox 컴포넌트를 불러옵니다.
import left from '../components/left';

const Main: React.FC = () => {
  return (
    <div className="main-container">
      {/* 다른 컴포넌트 */}
      <MiddleBox /> {/* MiddleBox 컴포넌트를 렌더링합니다. */}
      {/* 다른 컴포넌트 */}
    </div>
  );
};

export default Main;



