CREATE TABLE programming_concepts (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    language VARCHAR(50),               -- 프로그래밍 언어 (예: Python, JavaScript, Java)
    function_name VARCHAR(100),         -- 함수 또는 개념 이름 (예: len(), map())
    usage_example TEXT,                 -- 함수 사용 예제 코드
    description TEXT                    -- 함수 또는 개념에 대한 설명
);


CREATE TABLE chat_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_message TEXT,              -- 사용자가 입력한 메시지
    bot_reply TEXT,                  -- 챗봇의 응답
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 메시지의 타임스탬프
);


CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,                    -- 메모 내용
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 메모 생성 시간
);

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,    -- 사용자의 이메일
    name VARCHAR(100) NOT NULL,            -- 사용자 이름
    role ENUM('student', 'professor') DEFAULT 'student', -- 사용자 역할
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 계정 생성 시간
);