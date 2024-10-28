import React, { useState } from 'react';
import './DBSearch.css';

interface DBSearchProps {
  onSearch: (query: string) => void;
}

const DBSearch: React.FC<DBSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search functions..."
      value={query}
      onChange={handleInputChange}
      className="search-input"
    />
  );
};

export default DBSearch;
