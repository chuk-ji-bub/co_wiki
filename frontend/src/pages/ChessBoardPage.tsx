import React from 'react';
import ChessPiece from '../components/ChessPiece';
import Chessboard from 'chessboardjsx';

const ChessBoardPage: React.FC = () => {
  // 체스 말의 위치와 정보를 관리하는 상태 로직을 추가할 수 있습니다.
  
  return (
    <div>
      <h1>Chess Game</h1>
      {/* ChessPiece 컴포넌트를 사용하여 체스판 렌더링 */}
      <ChessPiece piece="pawn" color="white" position="e4" />
      {/* 추가 ChessPiece 컴포넌트 렌더링 */}
    </div>
  );
};

export default ChessBoardPage;
