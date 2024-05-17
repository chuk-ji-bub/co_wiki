import React from 'react';

import MiddleBox from '../components/middle/middle'; // MiddleBox 컴포넌트를 불러옵니다.
//import LeftBox from '../components/left'; // LeftBox 컴포넌트를 불러옵니다.
//import Main from './main';


const App: React.FC = () => {
    return (
      <div className="main-container">
        {/* MiddleBox와 LeftBox 컴포넌트를 모두 렌더링합니다. */}
        <MiddleBox />
      </div>
    );
  };
  
  export default App;
