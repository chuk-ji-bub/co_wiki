import React, { useState, useEffect } from 'react';
import './DBForm.css';

interface Concept {
  id?: number;
  language: string;
  function_name: string;
  usage_example: string;
  description: string;
}

interface DBFormProps {
  onAdd: (newConcept: Concept) => void;
  onUpdate: (updatedConcept: Concept) => void;
  editConcept: Concept | null;
  setEditConcept: (concept: Concept | null) => void;
  languages: string[];
}

const DBForm: React.FC<DBFormProps> = ({ onAdd, onUpdate, editConcept, setEditConcept, languages }) => {
  const [conceptData, setConceptData] = useState<Concept>({
    language: '',
    function_name: '',
    usage_example: '',
    description: '',
  });

  // editConcept이 변경될 때마다 폼 데이터를 설정
  useEffect(() => {
    if (editConcept) {
      setConceptData(editConcept);
    } else {
      setConceptData({ language: '', function_name: '', usage_example: '', description: '' });
    }
  }, [editConcept]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConceptData({ ...conceptData, [name]: value });
  };

  const handleSubmit = () => {
    if (conceptData.id) {
      // 수정 모드
      onUpdate(conceptData);
    } else {
      // 추가 모드
      onAdd(conceptData);
    }
    resetForm();
  };

  const resetForm = () => {
    setConceptData({ language: '', function_name: '', usage_example: '', description: '' });
    setEditConcept(null); // 수정 모드 해제
  };

  return (
    <div className="db-form">
      <select name="language" onChange={handleChange} value={conceptData.language} className="form-select">
        <option value="">Select Language</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <input 
        name="function_name" 
        placeholder="Function Name" 
        onChange={handleChange} 
        value={conceptData.function_name} 
      />
      <textarea 
        name="usage_example" 
        placeholder="Usage Example" 
        onChange={handleChange} 
        value={conceptData.usage_example} 
      />
      <textarea 
        name="description" 
        placeholder="Description" 
        onChange={handleChange} 
        value={conceptData.description} 
      />
      <button onClick={handleSubmit}>
        {conceptData.id ? 'Update Concept' : 'Add Concept'}
      </button>
      {conceptData.id && <button onClick={resetForm} className="cancel-btn">Cancel</button>}
    </div>
  );
};

export default DBForm;
