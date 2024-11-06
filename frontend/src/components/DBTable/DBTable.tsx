import React from 'react';
import './DBTable.css';

interface Concept {
  id?: number;
  language: string;
  function_name: string;
  usage_example: string;
  description: string;
}

interface DBTableProps {
  concepts: Concept[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (concept: Concept) => void;
}

const DBTable: React.FC<DBTableProps> = ({ concepts, onDelete, onEdit }) => {
  return (
    <table className="concept-table">
      <thead>
        <tr>
          <th>Function Name</th>
          <th>Usage Example</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {concepts.map((concept) => (
          <tr key={concept.id}>
            <td>{concept.function_name}</td>
            <td>{concept.usage_example}</td>
            <td>{concept.description}</td>
            <td>
              {/* 수정 버튼 */}
              <button onClick={() => onEdit(concept)}>Edit</button>
              {/* 삭제 버튼 */}
              {concept.id && (
                <button onClick={() => onDelete(concept.id as number)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DBTable;
