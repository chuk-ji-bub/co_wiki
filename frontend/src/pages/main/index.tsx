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
  const [languages, setLanguages] = useState<string[]>([]); // DB에서 불러온 언어 목록 상태
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python'); 
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  // 언어 목록을 DB에서 가져오는 함수
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/languages');
        const data = await response.json();
        setLanguages(data); // DB에서 가져온 언어 목록 설정
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  return (
    <div className="main-container">
      <LanguageSelector 
        languages={languages} 
        onSelectLanguage={setSelectedLanguage} 
      />
      <div className="content">
        <LeftBox 
          selectedLanguage={selectedLanguage} 
          onTermClick={handleTermClick} 
        />
        <MiddleBox term={selectedTerm} />
        <RightBox />
      </div>
    </div>
  );
};

export default Main;
