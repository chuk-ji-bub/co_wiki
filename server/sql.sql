USE co_wiki;


CREATE TABLE dictionary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kr VARCHAR(255) NOT NULL,         -- 함수의 한국어 명칭
    en VARCHAR(255) NOT NULL,         -- 함수의 영어 명칭
    definition TEXT NOT NULL          -- 함수의 정의 및 설명
) CHARSET=utf8;

USE co_wiki;

-- 교수 이메일을 저장할 테이블 생성
CREATE TABLE allowed_professors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE  -- 교수로 허용된 이메일
) CHARSET=utf8;

-- 교수 이메일 추가
INSERT INTO allowed_professors (email) VALUES ('zxcv828133@gmail.com');


DROP TABLE IF EXISTS login;

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,       -- 유저 ID (기본 키)
    email VARCHAR(255) NOT NULL UNIQUE,      -- 이메일 (유니크, 구글에서 받아옴)
    name VARCHAR(255) NOT NULL,              -- 사용자 이름 (구글에서 받아옴)
    role VARCHAR(50) NOT NULL DEFAULT '학생' -- 역할 (기본값: '학생', 관리자가 변경 가능)
) CHARSET=utf8;



