import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
const Chess = require("chess.js").Chess;



const MainPage: React.FC = () => {
  const [game, setGame] = useState(() => new Chess("8/8/8/8/8/8/4P3/8 w - - 0 1"));
  const [gameStarted, setGameStarted] = useState(false);

  const handleMove = (move: { from: string; to: string }) => {
    const moveResult = game.move({ from: move.from, to: move.to, promotion: 'q' });
    
    if (moveResult && move.to === "e4") {
      setGameStarted(true); // 게임 매칭 시작
      // 여기서 게임 매칭 로직을 구현할 수 있습니다.
      alert("Game matching started!");
    }
    
    // 게임 상태 업데이트
    setGame(new Chess(game.fen()));
  };

  return (
    <div>
      {!gameStarted && (
        <Chessboard
          position={game.fen()}
          onDrop={({ sourceSquare, targetSquare }) =>
            handleMove({ from: sourceSquare, to: targetSquare })
          }
          width={320}
          id="StartingPosition"
          boardStyle={{
            borderRadius: "5px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)"
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
