import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './login.css';  // 스타일 적용

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserName: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setUserName }) => {
  const navigate = useNavigate();

  // 로그인 성공 시 처리 함수
  const handleSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);

    fetch('http://localhost:5000/api/google_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token); // 토큰 저장
          localStorage.setItem('userName', data.name); // 사용자 이름 저장
          setUserName(data.name);  // 상태 업데이트
          setIsAuthenticated(true);  // 로그인 상태 설정
          navigate('/');  // 메인 페이지로 이동
        } else {
          alert('로그인 실패');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('로그인에 실패했습니다.');
      });
  };

  // 로그인 실패 시 처리
  const handleError = () => {
    alert('로그인에 실패했습니다.');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Google 로그인</h2>
        
        {/* Google Login 버튼 */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Login Success:", credentialResponse);
            handleSuccess(credentialResponse);
          }}
          onError={handleError}
          useOneTap={false}  // OneTap 로그인 비활성화
          auto_select={false}
        />
      </div>
    </div>
  );
};

export default Login;
