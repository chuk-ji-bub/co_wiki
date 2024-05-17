import React from 'react';

import MiddleBox from '../components/middle/middle'; // MiddleBox 컴포넌트를 불러옵니다.
import LeftBox from '../components/left/left'; // LeftBox 컴포넌트를 불러옵니다.
import RightBox from '../components/right/right'; // RightBox 컴포넌트를 불러옵니다.
import Header from '../components/Header/Header';
//import Main from './main';


const App: React.FC = () => {
    return (
      <div className="main-container">
        {/* MiddleBox와 LeftBox 컴포넌트를 모두 렌더링합니다. */}
        <Header/>
        <MiddleBox />
        {/* <LeftBox/>*/}
        <RightBox/>
      </div>
    );
  };
  
  export default App;
