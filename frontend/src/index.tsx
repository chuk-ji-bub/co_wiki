import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 디버깅용 클라이언트 ID 확인
// console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
