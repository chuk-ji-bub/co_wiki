import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './login.css';

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserName: (name: string) => void;  // 유저 이름 상태를 설정하는 함수 추가
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setUserName }) => {
  const navigate = useNavigate();

  const handleSuccess = (response: any) => {
    fetch('http://localhost:5000/api/google_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: response.credential,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userName', data.name);  // 유저 이름을 로컬 스토리지에 저장
          setUserName(data.name);  // 유저 이름 상태 설정
          setIsAuthenticated(true);
          alert(`${data.name}님 환영합니다!`);
          navigate('/');  // 메인 페이지로 리디렉션
        } else {
          alert('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('로그인에 실패했습니다.');
      });
  };

  const handleError = () => {
    alert('로그인에 실패했습니다.');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
};

export default Login;
