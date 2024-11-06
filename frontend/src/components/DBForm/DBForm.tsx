import React, { useState } from 'react';
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
  languages: string[];
}

const DBForm: React.FC<DBFormProps> = ({ onAdd, languages }) => {
  const [newConcept, setNewConcept] = useState<Concept>({
    language: '',
    function_name: '',
    usage_example: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewConcept({ ...newConcept, [name]: value });
  };

  const handleSubmit = async () => {
    onAdd(newConcept);  // `newConcept`에 `id` 필드 없이 전달
    setNewConcept({ language: '', function_name: '', usage_example: '', description: '' });
  };

  return (
    <div className="db-form">
      <select name="language" onChange={handleChange} value={newConcept.language} className="form-select">
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
        value={newConcept.function_name} 
      />
      <textarea 
        name="usage_example" 
        placeholder="Usage Example" 
        onChange={handleChange} 
        value={newConcept.usage_example} 
      />
      <textarea 
        name="description" 
        placeholder="Description" 
        onChange={handleChange} 
        value={newConcept.description} 
      />
      <button onClick={handleSubmit}>Add Concept</button>
    </div>
  );
};

export default DBForm;
