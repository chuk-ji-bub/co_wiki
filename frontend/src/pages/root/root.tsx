import React, { useState, useEffect } from 'react';
import DBSearch from '../../components/DBSearch/DBSearch';
import DBTable from '../../components/DBTable/DBTable';
import DBForm from '../../components/DBForm/DBForm';
import './root.css';

interface Concept {
  id?: number;
  language: string;
  function_name: string;
  usage_example: string;
  description: string;
}

const Root: React.FC = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [filteredConcepts, setFilteredConcepts] = useState<Concept[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [isAddingLanguage, setIsAddingLanguage] = useState<boolean>(false);
  const [editConcept, setEditConcept] = useState<Concept | null>(null); // 수정 중인 항목

  useEffect(() => {
    fetchLanguages();
    if (selectedLanguage) {
      fetchConcepts();
    }
  }, [selectedLanguage]);

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/languages');
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchConcepts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/functions?language=${selectedLanguage}`);
      const data = await response.json();
      setConcepts(data);
    } catch (error) {
      console.error('Error fetching concepts:', error);
    }
  };

  const handleSearch = (query: string) => {
    const results = concepts.filter((concept) =>
      concept.function_name.toLowerCase().includes(query.toLowerCase()) ||
      concept.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConcepts(results);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/functions/${id}`, { method: 'DELETE' });
      setConcepts(concepts.filter((concept) => concept.id !== id));
    } catch (error) {
      console.error('Error deleting concept:', error);
    }
  };

  const handleAdd = async (newConcept: Concept) => {
    try {
      const response = await fetch('http://localhost:5000/api/functions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConcept),
      });

      const data = await response.json();
      if (response.ok) {
        setConcepts([...concepts, { ...newConcept, id: data.id }]);
        if (!languages.includes(newConcept.language)) {
          setLanguages([...languages, newConcept.language]);
        }
      } else {
        console.error('Error adding function:', data.error);
      }
    } catch (error) {
      console.error('Error adding function:', error);
    }
  };

  const handleEdit = (concept: Concept) => {
    setEditConcept(concept); // 선택한 항목을 수정 상태로 설정
  };

  const handleUpdate = async (updatedConcept: Concept) => {
    if (!updatedConcept.id) return;  // ID가 없으면 업데이트하지 않음
    try {
      const response = await fetch(`http://localhost:5000/api/functions/${updatedConcept.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConcept),
      });
      if (response.ok) {
        setConcepts(concepts.map((concept) => 
          concept.id === updatedConcept.id ? updatedConcept : concept
        ));
        setEditConcept(null); // 수정 완료 후 초기화
      } else {
        const data = await response.json();
        console.error('Error updating function:', data.error);
      }
    } catch (error) {
      console.error('Error updating function:', error);
    }
  };

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
      setIsAddingLanguage(false);  // 언어 추가 후 입력 필드 숨김
    }
  };

  return (
    <div className="root-container">
      <h1>Programming Concepts Management</h1>

      {/* 언어 선택 드롭다운 및 새 언어 추가 버튼 */}
      <div className="language-selector">
        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)} 
          className="language-dropdown"
        >
          <option value="">Select Language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button onClick={() => setIsAddingLanguage(!isAddingLanguage)} className="add-language-btn">+</button>

        {isAddingLanguage && (
          <div className="new-language-container">
            <input 
              type="text" 
              placeholder="New language" 
              value={newLanguage} 
              onChange={(e) => setNewLanguage(e.target.value)} 
              className="new-language-input"
            />
            <button onClick={addLanguage} className="confirm-language-btn">Add</button>
          </div>
        )}
      </div>

      {/* 검색 필드 */}
      <DBSearch onSearch={handleSearch} />

      {/* 데이터 추가 및 수정 폼 */}
      <DBForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editConcept={editConcept}
        setEditConcept={setEditConcept}
        languages={languages}
      />

      {/* 데이터 테이블 */}
      <DBTable 
        concepts={filteredConcepts.length > 0 ? filteredConcepts : concepts} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
};

export default Root;
