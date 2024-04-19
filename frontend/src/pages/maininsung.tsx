import React from 'react';

import Header from '../components/Header';
import MiddleBox from '../components/middle'; 
import Left from '../components/left';

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <Header/>
      <Left /> 
      
    </div>
  );
};

export default Main;



