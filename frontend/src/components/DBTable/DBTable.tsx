import React from 'react';
import './DBTable.css';

interface Concept {
  id?: number;  // 선택적 필드로 수정
  function_name: string;
  usage_example: string;
  description: string;
}

interface DBTableProps {
  concepts: Concept[];
  onDelete: (id: number) => Promise<void>;
}

const DBTable: React.FC<DBTableProps> = ({ concepts, onDelete }) => {
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
              {/* concept.id가 존재하는 경우에만 onDelete 호출 */}
              {concept.id !== undefined && (
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
