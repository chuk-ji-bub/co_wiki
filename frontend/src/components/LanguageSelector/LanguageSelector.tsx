import React from 'react';
import './LanguageSelector.css';

interface LanguageSelectorProps {
  onSelectLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const languages = [
    { code: 'Py', name: 'Python', color: '#3776AB' },
    { code: 'JS', name: 'JavaScript', color: '#F7DF1E' },
    { code: 'Ja', name: 'Java', color: '#5382A1' }
  ];

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
