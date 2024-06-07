import React, { useState } from 'react';
import LeftBox from '../../components/left/left';
import MiddleBox from '../../components/middle/middle';
import Header from '../../components/Header/Header';


interface Term {
  kr: string;
  en: string;
  definition: string;
}

const Main: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  return (
    <div className="main-container">
      <Header />
      <div className="content">
        <LeftBox onTermClick={handleTermClick} />
        <MiddleBox term={selectedTerm} />
      </div>
    </div>
  );
};

export default Main;
