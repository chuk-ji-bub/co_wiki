import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js'; // 수정된 import 문
import { useNavigate } from 'react-router-dom';

const MainChessBoard: React.FC = () => {
  const [game, setGame] = useState<any>(new Chess());
  const navigate = useNavigate();

  const handleMove = (move: { from: string; to: string; promotion?: string }) => {
    const result = game.move(move);

    if (result) {
      // 유효한 이동인 경우, 게임 상태를 업데이트합니다.
      setGame(new Chess(game.fen()));

      // 특정 이동에 따른 조건 검사
      if (move.from === "d2" && move.to === "d4" && game.move('d7d5')) {
        navigate('/match');
      } else if (move.from === "e2" && move.to === "e4" && game.move('e7e5')) {
        navigate('/play-computer');
      }
    }
  };

  return (
    <Chessboard
      id="MainChessBoard"
      position={game.fen()}
      width={320}
      onDrop={({ sourceSquare, targetSquare }) => 
        handleMove({ from: sourceSquare, to: targetSquare })
      }
    />
  );
};

export default MainChessBoard;
