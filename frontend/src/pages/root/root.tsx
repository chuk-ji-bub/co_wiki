import React, { useState, useEffect } from 'react';
import DBSearch from '../../components/DBSearch/DBSearch';
import DBTable from '../../components/DBTable/DBTable';
import DBForm from '../../components/DBForm/DBForm';      
import './root.css';

interface Concept {
  id: number;
  language: string;
  function_name: string;
  usage_example: string;
  description: string;
}

const Root: React.FC = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [filteredConcepts, setFilteredConcepts] = useState<Concept[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Python');

  // 초기 데이터 가져오기
  useEffect(() => {
    fetchConcepts();
  }, [selectedLanguage]);

  const fetchConcepts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/functions?language=${selectedLanguage}`);
      const data = await response.json();
      setConcepts(data);
    } catch (error) {
      console.error('Error fetching concepts:', error);
    }
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    const results = concepts.filter((concept) =>
      concept.function_name.toLowerCase().includes(query.toLowerCase()) ||
      concept.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConcepts(results);
  };

  // 삭제 핸들러
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/functions/${id}`, { method: 'DELETE' });
      setConcepts(concepts.filter((concept) => concept.id !== id));
    } catch (error) {
      console.error('Error deleting concept:', error);
    }
  };

  // 추가 핸들러
  const handleAdd = (newConcept: Concept) => {
    setConcepts([...concepts, newConcept]);
  };

  return (
    <div className="root-container">
      <h1>Manage Programming Concepts</h1>
      <div className="language-selector">
        <button onClick={() => setSelectedLanguage('Python')}>Python</button>
        <button onClick={() => setSelectedLanguage('JavaScript')}>JavaScript</button>
        <button onClick={() => setSelectedLanguage('Java')}>Java</button>
      </div>
      <DBSearch onSearch={handleSearch} />
      <DBForm onAdd={handleAdd} />
      <DBTable 
        concepts={filteredConcepts.length > 0 ? filteredConcepts : concepts} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default Root;
