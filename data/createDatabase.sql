DROP DATABASE IF EXISTS deltaEvents;
CREATE DATABASE deltaEvents;
USE deltaEvents;

CREATE TABLE accounts (
    id int NOT NULL AUTO_INCREMENT,
    sysAdmin bool NOT NULL,
    username varchar(255) NOT NULL,
    password longtext NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE events (
    eventId varchar(36) NOT NULL,
    accountId int NOT NULL,
    name varchar(255) NOT NULL,
    location varchar(255) NOT NULL,
    startDate datetime NOT NULL,
    endDate datetime NOT NULL,
    info longtext NOT NULL,
    going json, 
    maybe json,
    notGoing json,
    PRIMARY KEY (eventId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO accounts (sysAdmin, username, password, email) VALUES (1, 'test', 'test', 'test@test.com');
INSERT INTO accounts (sysAdmin, username, password, email) VALUES (0, 'test_2', 'test_2', 'test_2@test.com');