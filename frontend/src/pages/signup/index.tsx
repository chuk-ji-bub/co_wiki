import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import Header from '../../components/Header/Header';

const Signup: React.FC = () => {
  const [isIdTaken, setIsIdTaken] = useState<boolean | null>(null);
  const [availableId, setAvailableId] = useState<string>('');
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState<boolean>(false);
  const [isIdFieldEditable, setIsIdFieldEditable] = useState<boolean>(true);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>(''); // 교수 or 학생 선택
  const [professorCode, setProfessorCode] = useState<string>(''); // 교수 코드 입력
  const [idErrorMessage, setIdErrorMessage] = useState<string>(''); // ID 오류 메시지
  const navigate = useNavigate();

  const validateId = (id: string) => {
    const englishOnly = /^[a-zA-Z]*$/;
    return englishOnly.test(id);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    if (!validateId(newId)) {
      setIdErrorMessage('ID는 영어만 입력 가능합니다.');
    } else {
      setIdErrorMessage('');
    }
    setAvailableId(newId);
    setIsIdFieldEditable(true); // ID가 변경되면 다시 수정 가능
    setIsCreateButtonEnabled(false); // ID가 변경되면 Create 버튼 비활성화
    setIsIdTaken(null); // ID 중복 상태 초기화
  };

  const checkUsername = async () => {
    if (!availableId) {
      setIsIdTaken(null);
      setIsCreateButtonEnabled(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/check_username/${availableId}`);
      const data = await response.json();

      setIsIdTaken(data.isTaken);
      if (!data.isTaken) {
        setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!name && validateId(availableId));
        setIsIdFieldEditable(false);
      } else {
        setIsCreateButtonEnabled(false);
        setIsIdFieldEditable(true);
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const checkPasswordMatch = () => {
    const password = (document.querySelector("input[name='password']") as HTMLInputElement)?.value;
    const confirm_password = (document.querySelector("input[name='confirm_password']") as HTMLInputElement)?.value;

    setPasswordsMatch(password === confirm_password);
    setIsPasswordEmpty(password === '');

    setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!name && !isIdTaken && validateId(availableId));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    setIsCreateButtonEnabled(!isPasswordEmpty && passwordsMatch && !!newName && !isIdTaken && validateId(availableId));
  };

  const getPasswordInputClassName = (): string => {
    if (isPasswordEmpty) {
      return 'password-input';
    } else if (passwordsMatch) {
      return 'password-input valid';
    } else {
      return 'password-input invalid';
    }
  };

  const handleCreateButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isCreateButtonEnabled) {
      try {
        const response = await fetch('http://localhost:5000/api/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: availableId,
            password: (document.querySelector("input[name='password']") as HTMLInputElement)?.value,
            confirm_password: (document.querySelector("input[name='confirm_password']") as HTMLInputElement)?.value,
            name,
            role,
            professorCode,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          navigate('/login'); // 로그인 페이지로 리디렉션
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('회원가입 실패. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="create-container">
        <div className="create-form">
          <form>
            <div className="id-input-container">
              <input
                type="text"
                name="id"
                placeholder="id"
                value={availableId}
                onChange={handleIdChange}
                readOnly={!isIdFieldEditable}
              />
              <button type="button" onClick={checkUsername} disabled={idErrorMessage !== ''}>Check ID</button>
            </div>
            {idErrorMessage && <p className="error-message">{idErrorMessage}</p>}
            <p><input type="password" name="password" placeholder="password" onChange={checkPasswordMatch} /></p>
            <p><input type="password" name="confirm_password" placeholder="confirm_password" onChange={checkPasswordMatch} className={getPasswordInputClassName()} /></p>
            <p><input type="text" name="name" placeholder="name" value={name} onChange={handleNameChange} /></p>
            <div className="role-selection">
              <label>
                <input type="radio" name="role" value="학생" checked={role === '학생'} onChange={() => setRole('학생')} />
                학생
              </label>
              <label>
                <input type="radio" name="role" value="교수" checked={role === '교수'} onChange={() => setRole('교수')} />
                교수
              </label>
            </div>
            {role === '교수' && (
              <p><input type="text" name="professor_code" placeholder="교수 코드" value={professorCode} onChange={(e) => setProfessorCode(e.target.value)} /></p>
            )}
            <p><button onClick={handleCreateButtonClick} disabled={!isCreateButtonEnabled}>create</button></p>
          </form>
          {isIdTaken === true && <p className="error-message">이미 사용 중인 아이디입니다.</p>}
          {isIdTaken === false && <p className="success-message">사용 가능한 아이디입니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
