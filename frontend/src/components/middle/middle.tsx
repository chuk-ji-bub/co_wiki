import React from 'react';
import './middle.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

interface MiddleProps {
  term: Term | null;
  onRequestExplanation: () => void;
}

const MiddleBox: React.FC<MiddleProps> = ({ term, onRequestExplanation }) => {
  return (
    <div className="middle-container">
      {term ? (
        <div className="definition-card">
          <h2>{term.function_name}</h2>
          <pre>{term.usage_example}</pre>
          <p>{term.description}</p>
          <button onClick={onRequestExplanation} className="explain-button">
            설명 듣기
          </button>
        </div>
      ) : (
        <p>함수에 대한 정보를 보려면 "자세히 보기" 버튼을 클릭하세요.</p>
      )}
    </div>
  );
};

export default MiddleBox;
