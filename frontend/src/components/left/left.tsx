// 메인페이지 왼쪽 선택할거
// left.tsx

import React, { useState, useEffect } from 'react';
import './left.css';

interface Term {
  term: string;
  definition: string;
}

interface LeftProps {
  onTermClick: (definition: string) => void;
}

const LeftBox: React.FC<LeftProps> = ({ onTermClick }) => {
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dictionary');
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  return (
    <div className="editor-container1">
      {terms.map((term, index) => (
        <div
          key={index}
          className="term"
          onClick={() => onTermClick(term.definition)}
        >
          {term.term}
        </div>
      ))}
    </div>
  );
};

export default LeftBox;
