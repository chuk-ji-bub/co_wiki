import React, { useState } from 'react';

// 언어 선택에 사용될 타입 정의
type Language = 'kr' | 'en';
type ProgrammingLanguage = 'python' | 'javascript';

const Header: React.FC = () => {
  // 상태 정의
  const [language, setLanguage] = useState<Language>('kr');
  const [programmingLanguage, setProgrammingLanguage] = useState<ProgrammingLanguage>('javascript');

  // 언어 변경 핸들러
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };

  // 프로그래밍 언어 변경 핸들러
  const handleProgrammingLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProgrammingLanguage(event.target.value as ProgrammingLanguage);
  };

  // 검색 이벤트 핸들러 (실제 로직은 구현 필요)
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 검색 로직 구현
    console.log('Search functionality to be implemented.');
  };



  return (
    <header>
      <div className="logo">CO_WIKI</div>
      <div className="dropdowns">
        
        <select value={language} onChange={handleLanguageChange}>
          <option value="kr">한국어</option>
          <option value="en">English</option>
        </select>

        <select value={programmingLanguage} onChange={handleProgrammingLanguageChange}>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

      </div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search..." />
        <button type="submit">🔍</button>
      </form>

      <div className="login-button">
        <button type="button">Login</button>
      </div>
      
    </header>
  );
};

export default Header;
