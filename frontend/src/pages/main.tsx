import React from 'react';
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

import Header from '../components/Header';
import left from '../components/left';
import Main_content from '../components/middle';
import Side_mark from '../components/rightup';
import Side_memo from '../components/rightdown';

// 메인 페이지 컴포넌트
const Main: React.FC = () => {

  
    return (
      <div>
        <header>
          <Header/>
        </header>
        <main>
          <div style={{ left: '10px' }}>
            <left/>
          </div>
        </main>
        
      </div>
    );
  };
  
  export default Main;
=======
>>>>>>> Stashed changes
import MiddleBox from '../components/middle'; // MiddleBox 컴포넌트를 불러옵니다.

const Main: React.FC = () => {
  return (
    <div className="main-container">
      {/* 다른 컴포넌트 */}
      <MiddleBox /> {/* MiddleBox 컴포넌트를 렌더링합니다. */}
      {/* 다른 컴포넌트 */}
    </div>
  );
};

<<<<<<< Updated upstream
export default Main;
=======
export default Main;
>>>>>>> 1314cef95ef5391b08309ecdd5132f18a0c3017f
>>>>>>> Stashed changes
