import React, { useState, useEffect } from 'react';
import './right.css';

interface Term {
  function_name: string;
  usage_example: string;
  description: string;
}

interface ChatbotProps {
  explanationRequest: Term | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ explanationRequest }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }
  ]);
  const [userInput, setUserInput] = useState('');

  // explanationRequest가 변경될 때마다 추가 설명 요청
  useEffect(() => {
    if (explanationRequest) {
      requestExplanationFromAI(explanationRequest);
    }
  }, [explanationRequest]);

  const requestExplanationFromAI = async (term: Term) => {
    try {
      const prompt = `
        다음은 프로그래밍 함수에 대한 정보입니다:
        함수 이름: ${term.function_name}
        예제: ${term.usage_example}
        설명: ${term.description}
        
        이 함수에 대한 추가적인 설명을 한국어로 자세히 제공해 주세요.
      `;

      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.reply }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '설명을 가져오는 데 문제가 발생했습니다.' },
      ]);
    }
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: '챗봇 응답에 문제가 발생했습니다.' },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
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
