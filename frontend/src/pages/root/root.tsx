import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './root.css';

interface Term {
  id: number;
  term: string;
  definition: string;
}

const Root: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (userRole !== '교수') {
      navigate('/test2');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dictionary');
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddTerm = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dictionary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: newTerm, definition: newDefinition }),
      });

      const data = await response.json();
      setTerms([...terms, data]);
      setNewTerm('');
      setNewDefinition('');
    } catch (error) {
      console.error('Error adding term:', error);
    }
  };

  const handleDeleteTerm = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/dictionary/${id}`, {
        method: 'DELETE',
      });

      setTerms(terms.filter((term) => term.id !== id));
    } catch (error) {
      console.error('Error deleting term:', error);
    }
  };

  return (
    <div className="root-container">
      <h1>Dictionary Management</h1>
      <div className="add-term">
        <input
          type="text"
          placeholder="New term"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Definition"
          value={newDefinition}
          onChange={(e) => setNewDefinition(e.target.value)}
        />
        <button onClick={handleAddTerm}>Add</button>
      </div>
      <ul>
        {terms.map((term) => (
          <li key={term.id}>
            <strong>{term.term}</strong>: {term.definition}
            <button onClick={() => handleDeleteTerm(term.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Root;
