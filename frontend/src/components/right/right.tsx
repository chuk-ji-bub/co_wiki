import React, { useState } from 'react';
import './right.css';

const Chatbot: React.FC = () => {
  // 초기 환영 메시지 설정
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }  // 초기 메시지
  ]);
  const [userInput, setUserInput] = useState('');

  // 사용자의 입력이 변경될 때 상태를 업데이트
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // 사용자 메시지를 추가
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.status === 429) {
        // API 사용량 초과 시 사용자에게 알림 메시지 추가
        setMessages([
          ...newMessages,
          { sender: 'bot', text: 'API 사용량이 초과되었습니다. 나중에 다시 시도해 주세요.' },
        ]);
        return;
      }

      // 응답 처리
      const data = await response.json();
      const formattedText = formatBotResponse(data.reply); // 응답을 포맷팅
      setMessages([...newMessages, { sender: 'bot', text: formattedText }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: '챗봇 응답에 문제가 발생했습니다.' },
      ]);
    }
  };

  // 코드 블록과 텍스트를 포맷팅하는 함수
  const formatBotResponse = (text: string) => {
    return text
      .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')  // 코드 블록을 <pre>로 감싸기
      .replace(/\n/g, '<br>'); // 줄바꿈을 <br>로 변환
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? 'user-message' : 'bot-message'}
            dangerouslySetInnerHTML={{ __html: message.text }} // HTML 포맷을 그대로 렌더링
          />
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInputChange}
          placeholder="질문을 입력하세요..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
