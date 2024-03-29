import React from 'react';
import { Link } from 'react-router-dom';
import MainChessBoard from '../components/MainChessBoard'; // MainChessBoard 컴포넌트를 import합니다.


const Main: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our Chess Game!</h1>
            <p>체스 게임을 즐겨보세요. 당신의 전략적 사고를 테스트하고 친구들과 함께 플레이해 보세요.</p>
            {/* MainChessBoard 컴포넌트를 렌더링합니다. */}
            <MainChessBoard />
            <div>
                <Link to="/match">
                    <button style={{ marginRight: '20px', padding: '10px 20px' }}>게임 매칭</button>
                </Link>
                <Link to="/play-computer">
                    <button style={{ padding: '10px 20px' }}>컴퓨터와 플레이</button>
                </Link>
            </div>
        </div>
    );
};

export default Main;
