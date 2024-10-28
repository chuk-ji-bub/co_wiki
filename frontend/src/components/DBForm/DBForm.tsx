import React, { useState } from 'react';
import './DBForm.css';

interface Concept {
  id: number;
  language: string;
  function_name: string;
  usage_example: string;
  description: string;
}

interface DBFormProps {
  onAdd: (newConcept: Concept) => void;
}

const DBForm: React.FC<DBFormProps> = ({ onAdd }) => {
  const [newConcept, setNewConcept] = useState<Concept>({
    id: 0,
    language: '',
    function_name: '',
    usage_example: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewConcept({ ...newConcept, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(newConcept);
    setNewConcept({ id: 0, language: '', function_name: '', usage_example: '', description: '' });
  };

  return (
    <div className="db-form">
      <input name="language" placeholder="Language" onChange={handleChange} value={newConcept.language} />
      <input name="function_name" placeholder="Function Name" onChange={handleChange} value={newConcept.function_name} />
      <textarea name="usage_example" placeholder="Usage Example" onChange={handleChange} value={newConcept.usage_example} />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={newConcept.description} />
      <button onClick={handleSubmit}>Add Concept</button>
    </div>
  );
};

export default DBForm;
