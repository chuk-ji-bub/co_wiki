import React, { useState, useEffect } from 'react';
import LeftBox from '../../components/left/left';
import MiddleBox from '../../components/middle/middle';
import RightBox from '../../components/right/right';
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

  const fixedLeftWidth = 200; // LeftBox 고정 너비 (px)
  const [middleWidth, setMiddleWidth] = useState(60); // MiddleBox 초기 너비 (%)
  const [rightWidth, setRightWidth] = useState(40); // RightBox 초기 너비 (%)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/languages');
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

  // MiddleBox와 RightBox 사이만 드래그 가능하게 설정
  const handleMouseDown = () => {
    const handleMouseMove = (event: MouseEvent) => {
      const newMiddleWidth = ((event.clientX - fixedLeftWidth) / (window.innerWidth - fixedLeftWidth)) * 100;
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
        <div className="left-container" style={{ width: `${fixedLeftWidth}px` }}>
          <LeftBox selectedLanguage={selectedLanguage} onTermClick={handleTermClick} />
        </div>
      </div>

      <div className="content">
        <div className="middle-container" style={{ width: `${middleWidth}%` }}>
          <MiddleBox term={selectedTerm} />
        </div>
        <div className="divider" onMouseDown={handleMouseDown} />

        <div className="right-container" style={{ width: `${rightWidth}%` }}>
          <RightBox />
        </div>
      </div>
    </div>
  );
};

export default Main;
