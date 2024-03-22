import React from 'react';

interface ChessPieceProps {
  piece: string; // 예: "pawn", "rook" 등
  color: 'white' | 'black';
  position: string; // 예: "e4", "d4" 등
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, color, position }) => {
  return (
    <div>
      {/* 체스 말을 표현하는 로직 */}
      <p>{`Piece: ${piece}, Color: ${color}, Position: ${position}`}</p>
    </div>
  );
};

export default ChessPiece;
