import React, { useState } from 'react';
import './right.css';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([]);
  const [userInput, setUserInput] = useState('');

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();

      setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { sender: 'bot', text: 'Error in chatbot response.' }]);
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
          placeholder="Ask a question..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
