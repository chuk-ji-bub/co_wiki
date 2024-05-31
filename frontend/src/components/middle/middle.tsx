// middle.tsx

import React, { useState } from 'react';
import './middle.css'; // 스타일링 파일 (CSS 모듈 등을 사용)

const MyEditor: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSaveClick = () => {
    // 저장 로직 구현
    console.log('저장되었습니다.');
  };

  return (
    <div className="editor-container2">
      <div className="text-panel2">
        <div className={`text-content2 ${expanded ? 'expanded' : ''}`}>
          {/* 텍스트 내용 */}
          {/* 여러 줄의 텍스트를 표시 */}
          {/* 예시: */}
          <p>JavaScript (JS)는 간단하고, 멀티 패러다임을 지원하는...</p>
        </div>
        <button className="expand-button2" onClick={handleExpandClick}>
          {expanded ? '접기' : '펼치기'}
        </button>
      </div>
      <div className="bookmarks-panel2">
        <h3>바로가기</h3>
        <ol>
          {bookmarks.map((bookmark, index) => (
            <li key={index}>{bookmark}</li>
          ))}
        </ol>
      </div>
      <div className="bookmarks-panel2">
        <h3>북마크</h3>
        <ol>
          {/* 북마크 목록 */}
          {/* 예시: */}
          <li>React 공식 문서</li>
          <li>TypeScript 학습 자료</li>
        </ol>
      </div>
      <button className="save-button2" onClick={handleSaveClick}>
        저장
      </button>
    </div>
  );
};

export default MyEditor;



