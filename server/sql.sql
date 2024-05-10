USE co_wiki;

drop table login;

CREATE TABLE login (
  id varchar(100) not null,
  password varchar(100) NOT NULL,
  name varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
)charset=utf8;