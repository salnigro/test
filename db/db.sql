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

CREATE TABLE todo (
    todoid SERIAL, -- auto increment
    userid CHAR(21) NOT NULL,
    todo TEXT NOT NULL,
    stamp TIMESTAMP NOT NULL,
    PRIMARY KEY (todoid),
    FOREIGN KEY (userid) REFERENCES users (userid)
);

INSERT INTO todo(userid, todo, stamp)
VALUES (112843048837006035357, 'Something', current_timestamp);

SELECT * FROM todo
WHERE userid = '112843048837006035357';