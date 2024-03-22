import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';

// 모듈을 상단에서 한 번만 로드
const Chess = require('chess.js').Chess;

const ChessBoard: React.FC = () => {
  // 게임 인스턴스를 생성하는 초기화 함수
  const [game, setGame] = useState<any>(() => new Chess());

  useEffect(() => {
    // 게임 상태나 턴이 변경될 때 수행할 작업이 있다면 여기에 추가합니다.
  }, [game]);

  const handleMove = (move: { from: string; to: string; promotion?: string }) => {
    if (game.move(move)) {
      setGame(new Chess(game.fen()));
    }
  };

  return (
    <Chessboard
      width={400}
      position={game.fen()}
      onDrop={({ sourceSquare, targetSquare }) =>
        handleMove({ from: sourceSquare, to: targetSquare })
      }
    />
  );
};

export default ChessBoard;
