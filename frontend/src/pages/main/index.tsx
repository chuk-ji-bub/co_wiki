import React, { useState, useEffect } from 'react';
import LeftBox from '../../components/left/left';
import MiddleBox from '../../components/middle/middle';
import Chatbot from '../../components/right/right';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

import './Main.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

const Main: React.FC = () => {
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python');
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [explanationRequest, setExplanationRequest] = useState<Term | null>(null);

  const [middleWidth, setMiddleWidth] = useState(60); // MiddleBox 초기 너비 (%)
  const [rightWidth, setRightWidth] = useState(40); // RightBox 초기 너비 (%)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/languages`);
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchLanguages();
  }, []);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  const handleRequestExplanation = () => {
    if (selectedTerm) {
      setExplanationRequest(selectedTerm);
    }
  };

  // Divider drag-and-resize handler
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX;
      const newMiddleWidth = ((middleWidth * window.innerWidth) / 100 + deltaX) * 100 / window.innerWidth;
      const newRightWidth = 100 - newMiddleWidth;

      if (newMiddleWidth > 30 && newRightWidth > 10) {
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="main-container">
      <div className="left-wrapper">
        <LanguageSelector languages={languages} onSelectLanguage={setSelectedLanguage} />
        <div className="left-container">
          <LeftBox selectedLanguage={selectedLanguage} onTermClick={handleTermClick} />
        </div>
      </div>

      <div className="content">
        <div className="middle-container" style={{ width: `${middleWidth}%` }}>
          <MiddleBox term={selectedTerm} onRequestExplanation={handleRequestExplanation} />
        </div>
        <div className="divider" onMouseDown={handleMouseDown} />
        <div className="right-container" style={{ width: `${rightWidth}%` }}>
          <Chatbot explanationRequest={explanationRequest} />
        </div>
      </div>
    </div>
  );
};

export default Main;
