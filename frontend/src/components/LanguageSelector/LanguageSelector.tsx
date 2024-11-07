import React, { useEffect, useState } from 'react';
import './LanguageSelector.css';

interface LanguageSelectorProps {
  onSelectLanguage: (language: string) => void;
}

interface Language {
  code: string;
  name: string;
  color: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    // 언어 목록을 불러오는 함수
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/languages');
        const data = await response.json();

        // DB에서 가져온 언어 목록을 상태로 설정
        const languageData = data.map((lang: string) => ({
          code: lang.slice(0, 2).toUpperCase(),  // 첫 두 글자를 코드로 사용
          name: lang,
          color: '#cccccc'  // 기본 색상 (필요시 언어에 따라 추가적으로 설정 가능)
        }));
        setLanguages(languageData);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <div
          key={lang.code}
          className="language-icon"
          style={{ backgroundColor: lang.color }}
          onClick={() => onSelectLanguage(lang.name)}
        >
          {lang.code}
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
