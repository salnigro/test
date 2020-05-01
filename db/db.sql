CREATE DATABASE mydb;

\c mydb

CREATE TABLE users (
    userid CHAR(21) PRIMARY KEY NOT NULL,
    given_name TEXT NOT NULL,
    family_name TEXT NOT NULL,
    imageurl TEXT NOT NULL,
    email VARCHAR(255) NOT NULL

);

INSERT INTO users(userid, given_name, family_name, imageurl, email)
VALUES(112843048837006035357, 'J.W.', 'Clark', 'asdf.jpg', 'jwclark@rockhursths.edu');
INSERT INTO users(userid, given_name, family_name, imageurl, email)
VALUES(111393713032104198938, 'Sal', 'Nigro', 'asdf.jpg', 'salnigro627@gmail.com');

CREATE TABLE todo (
    todoid SERIAL, -- auto increment
    userid CHAR(21) NOT NULL,
    todo TEXT NOT NULL,
    stamp TIMESTAMP NOT NULL,
    PRIMARY KEY (todoid),
    FOREIGN KEY (userid) REFERENCES users (userid)
);

INSERT INTO todo(userid, todo, stamp)
VALUES (111393713032104198938, 'Something', current_timestamp);

SELECT * FROM todo
WHERE userid = '111393713032104198938';

INSERT INTO users(userid, given_name, family_name, imageurl, email)
VALUES(111393713032104198938, 'Sal', 'Nigro', 'asdf.jpg', 'salnigro627@gmail.com')
ON CONFLICT(userid) DO NOTHING;

SELECT * FROM users
WHERE userid = '111393713032104198938';

SELECT * FROM users
    ORDER BY userid;

SELECT * FROM todo
    ORDER BY userid;

SELECT * FROM todo
INSERT INTO todo(userid, todo, stamp)
VALUES (111393713032104198938, 'Something', current_timestamp)
WHERE todoid = '1';

DELETE FROM users
WHERE userid = '112843048837006035357';

DELETE FROM todo
WHERE userid = '112843048837006035357';

INSERT INTO todo(userid, todo, stamp)
VALUES (111393713032104198938, 'Something', current_timestamp)
WHERE todoid = '1';

update todo
   set userid = case todoid
                 when 1 then (select userid from todo where todoid = 2)
              end

update todo set todoid = (case todoid when 1 then 2 when 2 then 1 else todoid end)
where todoid in (1,2);
