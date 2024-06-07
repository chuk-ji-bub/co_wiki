import React, { useState, useEffect } from 'react';
import './left.css';

interface Term {
  kr: string;
  en: string;
  definition: string;
}

interface LeftProps {
  onTermClick: (definition: string) => void;
}

const LeftBox: React.FC<LeftProps> = ({ onTermClick }) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTerms = terms.filter(term =>
    term.kr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="editor-container1">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredTerms.map((term, index) => (
        <div
          key={index}
          className="term"
          onClick={() => onTermClick(term.definition)}
        >
          {term.kr} / {term.en}
        </div>
      ))}
    </div>
  );
};

export default LeftBox;
