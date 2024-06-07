import React from 'react';
import './middle.css';

interface MiddleProps {
  definition: string;
}

const MiddleBox: React.FC<MiddleProps> = ({ definition }) => {
  return (
    <div className="editor-container2">
      <p>{definition}</p>
    </div>
  );
};

export default MiddleBox;
