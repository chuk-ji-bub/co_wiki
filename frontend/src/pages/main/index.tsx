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
  const [explanationRequest, setExplanationRequest] = useState<Term | null>(null); // 설명 요청 상태

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

  const handleRequestExplanation = () => {
    if (selectedTerm) {
      setExplanationRequest(selectedTerm); // 설명 요청 상태에 현재 선택된 용어 정보를 설정
    }
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
        <div className="middle-container">
          <MiddleBox term={selectedTerm} onRequestExplanation={handleRequestExplanation} />
        </div>
        <div className="right-container">
          <Chatbot explanationRequest={explanationRequest} />
        </div>
      </div>
    </div>
  );
};

export default Main;
