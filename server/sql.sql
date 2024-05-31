USE co_wiki;

drop table login;

CREATE TABLE login (
  id varchar(100) not null,
  password varchar(100) NOT NULL,
  name varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
)charset=utf8;


CREATE TABLE dictionary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL
) CHARSET=utf8;

INSERT INTO dictionary (term, definition) VALUES
('백엔드', '백엔드란 웹 애플리케이션의 서버 측에서 동작하는 부분을 의미합니다. 백엔드는 데이터베이스와 상호 작용하고, 클라이언트로부터 요청을 처리하며, 비즈니스 로직을 수행합니다.'),
('프론트엔드', '프론트엔드란 웹 애플리케이션의 사용자 인터페이스를 담당하는 부분을 의미합니다. 프론트엔드는 사용자가 보는 웹 페이지를 구성하고, 사용자와 상호 작용하는 기능을 제공합니다.');

ALTER TABLE login ADD COLUMN 직업 VARCHAR(50);

