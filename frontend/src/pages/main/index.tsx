//main 페이지

import React, { useState } from 'react';
import LeftBox from '../../components/left/left';
import MiddleBox from '../../components/middle/middle';

import Header from '../../components/Header/Header';


const App: React.FC = () => {
  const [definition, setDefinition] = useState<string>('');

  const handleTermClick = (definition: string) => {
    setDefinition(definition);
  };

  return (
    <div className="main-container">
      <Header />
      <LeftBox onTermClick={handleTermClick} />
      <MiddleBox definition={definition} />

    </div>
  );
};

export default App;
