import React from 'react';
import './LanguageSelector.css';

interface LanguageSelectorProps {
  languages: string[];
  onSelectLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onSelectLanguage }) => {
  return (
    <div className="language-selector">
      {languages.map((lang, index) => (
        <div
          key={index}
          className="language-icon"
          style={{ backgroundColor: '#cccccc' }} // 각 언어별 색상 지정 가능
          onClick={() => onSelectLanguage(lang)}
        >
          {lang.slice(0, 2).toUpperCase()} {/* 언어 코드 표시 */}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
