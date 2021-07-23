CREATE DATABASE IF NOT EXISTS DataWarehouseDB;
USE DataWarehouseDB;

CREATE TABLE IF NOT EXISTS users (
	userId INT NOT NULL AUTO_INCREMENT,
	u_name VARCHAR(45) NOT NULL,
    lastname VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    adress VARCHAR(60) NOT NULL,
    isAdmin INT DEFAULT 0,
    PRIMARY KEY(userId),
    KEY (isAdmin),
    CONSTRAINT users_fk_1 FOREIGN KEY (isAdmin) REFERENCES rols (rolId)
);
INSERT INTO users
VALUES 
	(1, "Melina", "Dev", "melina@gmail.com", "cjgjfdhgbdf", 1),
    (2, "juan", "user", "juan@juan.com", "cjgjfdhgbdf", 0);

CREATE TABLE IF NOT EXISTS rols (
	rolId INT NOT NULL,
	rol_name VARCHAR(45) NOT NULL,
    PRIMARY KEY(rolId)
);
INSERT INTO rols
VALUES 
	(0, "user"),
	(1, "admin");

CREATE TABLE IF NOT EXISTS auths (
	authId INT NOT NULL AUTO_INCREMENT,
    auth_pass TEXT,
    userId INT DEFAULT NULL,
    createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (authId),
    KEY (userId)
);
ALTER TABLE auths ADD FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO auths
VALUES 
	(1, "$2b$10$DeHaGn/JZ7Zmi6CSEn9SB.8t2Uuqt.KvV1i2GVUUgOGzym28yQQZO", 1, "2021-06-27 10:28:51"),
    (2, '$2b$10$Lv3XENY0Gk8ekUTGPuOONuYU2kgsX9k4S4yK4ilQy9MhLfI.xDHAK', 2, "2021-07-23 10:46:24");

CREATE TABLE IF NOT EXISTS regions (
	regionId INT NOT NULL AUTO_INCREMENT,
    reg_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (regionId)
);


CREATE TABLE IF NOT EXISTS countries (
	countryId INT NOT NULL AUTO_INCREMENT,
    count_name VARCHAR(45) NOT NULL,
    regionId INT,
    PRIMARY KEY (countryId),
    KEY (regionId)
);
ALTER TABLE countries ADD FOREIGN KEY (regionId) REFERENCES regions (regionId) ON DELETE CASCADE ON UPDATE SET NULL;
  
CREATE TABLE IF NOT EXISTS cities (
	cityId INT NOT NULL AUTO_INCREMENT,
    city_name VARCHAR(45) NOT NULL,
    countryId INT,
    regionId INT,
    PRIMARY KEY (cityId),
    KEY (countryId)
);
ALTER TABLE cities ADD FOREIGN KEY (countryId) REFERENCES countries (countryId) ON DELETE CASCADE ON UPDATE SET NULL;


CREATE TABLE IF NOT EXISTS companies (
	companyId INT NOT NULL AUTO_INCREMENT,
	c_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) UNIQUE,
    phone VARCHAR(15),
    adress VARCHAR(60) NOT NULL,
    regionId INT,
	countryId INT,
    cityId INT,
    PRIMARY KEY(companyId),
    KEY (cityId),
    KEY (countryId),
    KEY (regionId)
);
ALTER TABLE companies ADD FOREIGN KEY (cityId) REFERENCES cities (cityId) ON DELETE SET NULL;
ALTER TABLE companies ADD FOREIGN KEY (countryId) REFERENCES countries (countryId) ON DELETE SET NULL;
ALTER TABLE regions ADD FOREIGN KEY (regionId) REFERENCES regions (regionId) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS channels (
	channelId INT NOT NULL AUTO_INCREMENT,
    chan_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (channelId)
);

INSERT INTO channels
VALUES 
	(1, "Pending"),
	(2, "Whatssapp"),
    (3, "Facebook"),
    (4, "Email"),
    (5, "Instagram"),
    (6, "Message"),
    (7, "Phone");

CREATE TABLE IF NOT EXISTS contacts (
	contactId INT NOT NULL AUTO_INCREMENT,
	imgURL VARCHAR(60),
    cont_name VARCHAR(45) NOT NULL,
    cont_lastname VARCHAR(45) NOT NULL,
    charge VARCHAR(60),
    email VARCHAR(60) UNIQUE,
    companyId INT,
    regionId INT,
    countryId INT,
    cityId INT,
    adress VARCHAR(60) NOT NULL,
    interest INT,
    PRIMARY KEY(contactId),
    KEY (companyId),
    KEY (regionId),    
    KEY (countryId),
    KEY (cityId)
);
ALTER TABLE contacts ADD FOREIGN KEY (companyId) REFERENCES companies (companyId) ON DELETE CASCADE;
   
CREATE TABLE IF NOT EXISTS contact_channel (
	ccId INT NOT NULL AUTO_INCREMENT,
    channelId INT,
    contactId INT,
    prefId INT,
    account VARCHAR(45), 
    PRIMARY KEY (ccId),
    KEY (channelId),
    KEY (contactId),
    KEY (prefId)
);
ALTER TABLE contact_channel ADD FOREIGN KEY (prefId) REFERENCES preference (prefId) ON DELETE SET NULL;
ALTER TABLE contact_channel ADD FOREIGN KEY (contactId) REFERENCES contacts (contactId) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS preference (
	prefId INT NOT NULL AUTO_INCREMENT,
    pref_name VARCHAR(45) NOT NULL,
    PRIMARY KEY (prefId)
);
INSERT INTO preference
VALUES 
    (1, "Sin Preferencia"),
	(2, "No molestar"),
    (3, "Canal Favorito");




