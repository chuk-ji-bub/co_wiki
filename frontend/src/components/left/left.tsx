import React, { useState, useEffect } from 'react';
import './left.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

interface LeftProps {
  selectedLanguage: string;
  onTermClick: (term: Term) => void;
}

const LeftBox: React.FC<LeftProps> = ({ selectedLanguage, onTermClick }) => {
  const [terms, setTerms] = useState<Term[]>([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/functions?language=${selectedLanguage}`);
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    if (selectedLanguage) {
      fetchTerms();
    }
  }, [selectedLanguage]);

  return (
    <div className="left-container">
      <h2>{selectedLanguage} Functions</h2>
      <div className="term-list">
        {terms.map((term, index) => (
          <div key={index} className="term" onClick={() => onTermClick(term)}>
            {term.function_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftBox;
