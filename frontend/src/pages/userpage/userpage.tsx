import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './userpage.css';

interface ChatRecord {
  sender: string;
  message: string;
  timestamp: string;
}

interface Note {
  id: string;
  content: string;
}

const UserPage: React.FC = () => {
  const [chatRecords, setChatRecords] = useState<ChatRecord[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');

  useEffect(() => {
    // 예시: 챗봇 대화 기록 가져오기 (API 연동)
    fetch('http://localhost:5000/api/chat_records')
      .then((res) => res.json())
      .then((data) => setChatRecords(data))
      .catch((error) => console.error('Error fetching chat records:', error));

    // 예시: 메모 가져오기 (AWS DynamoDB 또는 로컬 저장소로부터)
    fetch('http://localhost:5000/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(e.target.value);
  };

  const handleAddNote = () => {
    const note = { id: Date.now().toString(), content: newNote };
    setNotes([...notes, note]);
    setNewNote('');

    // 메모를 서버에 저장 (AWS DynamoDB 연동 예시)
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }).catch((error) => console.error('Error adding note:', error));
  };

  return (
    <div className="userpage-container">
      <h1>환영합니다!</h1>

      <Link to="/dbpage" className="db-button">DB 관리 페이지로 이동</Link>

      <div className="chat-records">
        <h2>챗봇 대화 기록</h2>
        {chatRecords.map((record, index) => (
          <div key={index} className="chat-record">
            <strong>{record.sender}</strong>: {record.message} <em>{record.timestamp}</em>
          </div>
        ))}
      </div>

      <div className="notes-section">
        <h2>메모</h2>
        <textarea
          value={newNote}
          onChange={handleNoteChange}
          placeholder="새로운 메모를 작성하세요..."
          className="note-input"
        />
        <button onClick={handleAddNote} className="add-note-button">
          메모 추가
        </button>

        <div className="note-list">
          {notes.map((note) => (
            <div key={note.id} className="note">
              {note.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
