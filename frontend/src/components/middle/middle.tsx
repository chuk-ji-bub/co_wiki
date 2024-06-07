import React from 'react';
import './middle.css';

interface Term {
  kr: string;
  en: string;
  definition: string;
}

interface MiddleProps {
  term: Term | null;
}

const MiddleBox: React.FC<MiddleProps> = ({ term }) => {
  return (
    <div className="editor-container2">
      {term ? (
        <div className="definition-card">
          <h2>{term.kr} / {term.en}</h2>
          <p>{term.definition}</p>
        </div>
      ) : (
        <p>단어를 선택해주세요.</p>
      )}
    </div>
  );
};

export default MiddleBox;
