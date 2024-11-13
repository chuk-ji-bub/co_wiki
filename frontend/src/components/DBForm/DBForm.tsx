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

  const [error, setError] = useState<string | null>(null);

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
    setError(null); // 입력 중 오류 메세지 초기화
  };

  const handleSubmit = () => {
    if (!conceptData.language || !conceptData.function_name || !conceptData.usage_example || !conceptData.description) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

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
    setError(null);
  };

  return (
    <div className="db-form">
      <select name="language" onChange={handleChange} value={conceptData.language} className="form-select">
        <option value="">언어 선택</option>
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
      {error && <p className="error-message">{error}</p>} {/* 오류 메시지 표시 */}
      
      <div className="button-group">
        <button onClick={handleSubmit} className="submit-btn">
          {conceptData.id ? 'Update Concept' : 'Add Concept'}
        </button>
        {conceptData.id && (
          <button onClick={resetForm} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default DBForm;
