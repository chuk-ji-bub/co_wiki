import React, { useState } from 'react';
import LeftBox from '../../components/left/left';
import MiddleBox from '../../components/middle/middle';
import RightBox from '../../components/right/right'; // 챗봇 컴포넌트 추가
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector'; // 언어 선택 컴포넌트 추가

import './Main.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

const Main: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python'); // 초기 언어는 Python으로 설정
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleTermClick = (term: Term) => {
    setSelectedTerm(term);
  };

  return (
    <div className="main-container">
      <LanguageSelector onSelectLanguage={setSelectedLanguage} /> {/* 언어 선택 컴포넌트 */}
      <div className="content">
        <LeftBox selectedLanguage={selectedLanguage} onTermClick={handleTermClick} /> {/* 선택된 언어로 함수 목록 표시 */}
        <MiddleBox term={selectedTerm} /> {/* 선택된 함수의 정보 표시 */}
        <RightBox /> {/* RightBox 챗봇 컴포넌트 */}
      </div>
    </div>
  );
};

export default Main;
