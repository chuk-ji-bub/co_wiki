import React, { useState, useEffect } from 'react';
import './root.css';

interface Term {
  id: number;
  kr: string;
  en: string;
  definition: string;
}

const Root: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [newTerm, setNewTerm] = useState<{ kr: string; en: string; definition: string }>({ kr: '', en: '', definition: '' });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleAddTerm = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dictionary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTerm),
      });
      const data = await response.json();
      setTerms([...terms, data]);
      setNewTerm({ kr: '', en: '', definition: '' });
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

  return (
    <div className="root-container">
      <h1>Dictionary Management</h1>
      <div className="term-list">
        {terms.map((term) => (
          <div key={term.id} className="term-item">
            <p><strong>KR:</strong> {term.kr}</p>
            <p><strong>EN:</strong> {term.en}</p>
            <p><strong>Definition:</strong> {term.definition}</p>
          </div>
        ))}
      </div>
      <div className="add-term">
        <h2>Add New Term</h2>
        <input
          type="text"
          name="kr"
          value={newTerm.kr}
          onChange={handleInputChange}
          placeholder="Korean term"
        />
        <input
          type="text"
          name="en"
          value={newTerm.en}
          onChange={handleInputChange}
          placeholder="English term"
        />
        <textarea
          name="definition"
          value={newTerm.definition}
          onChange={handleInputChange}
          placeholder="Definition"
        />
        <button onClick={handleAddTerm}>Add Term</button>
      </div>
    </div>
  );
};

export default Root;
