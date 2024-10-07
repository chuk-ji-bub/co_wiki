import React from 'react';
import './middle.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

interface MiddleProps {
  term: Term | null;
}

const MiddleBox: React.FC<MiddleProps> = ({ term }) => {
  return (
    <div className="middle-container">
      {term ? (
        <div className="definition-card">
          <h2>{term.function_name}</h2>
          <pre>{term.usage_example}</pre>
          <p>{term.description}</p>
        </div>
      ) : (
        <p>Please select a function to see details.</p>
      )}
    </div>
  );
};

export default MiddleBox;
