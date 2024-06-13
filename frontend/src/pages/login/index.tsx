import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Header from '../../components/Header/Header';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/get_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.name === null) {
          console.log('아이디 또는 비밀번호가 다릅니다.');
          alert('아이디 또는 비밀번호가 다릅니다.');
        } else {
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userRole', data.role); // 역할 저장
          console.log('서버에서 받은 이름:', data.name);
          navigate('/'); // 로그인 성공 시 메인 페이지로 이동
          alert(data.name + '님 환영합니다');
        }
      } else {
        console.error('서버 응답 오류');
      }
    } catch (error) {
      console.error('요청 실패:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-text-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-button-container">
              <button type="submit" className="login-button">
                login
              </button>
              <Link to="/signup">
                <button type="button" className="signup-button">
                  signup
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
