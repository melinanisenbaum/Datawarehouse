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
    KEY (userId),
    CONSTRAINT auths_fk_1 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE SET NULL ON UPDATE CASCADE
);
    
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
    KEY (regionId),
    CONSTRAINT countries_fk_1 FOREIGN KEY (regionId) REFERENCES regions (regionId) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS cities (
	cityId INT NOT NULL AUTO_INCREMENT,
    city_name VARCHAR(45) NOT NULL,
    countryId INT,
    regionId INT,
    PRIMARY KEY (cityId),
    KEY (countryId),
    CONSTRAINT cities_fk_1 FOREIGN KEY (countryId) REFERENCES countries (countryId) ON DELETE SET NULL ON UPDATE CASCADE
);

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
    KEY (regionId),
    CONSTRAINT companies_fk_1 FOREIGN KEY (cityId) REFERENCES cities (cityId),
    CONSTRAINT companies_fk_2 FOREIGN KEY (countryId) REFERENCES countries (countryId) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT companies_fk_3 FOREIGN KEY (regionId) REFERENCES regions (regionId) ON DELETE SET NULL ON UPDATE CASCADE
);

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
    KEY (cityId),
    CONSTRAINT contacts_fk_1 FOREIGN KEY (companyId) REFERENCES companies (companyId),
	CONSTRAINT contacts_fk_2 FOREIGN KEY (regionId) REFERENCES regions (regionId) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT contacts_fk_3 FOREIGN KEY (countryId) REFERENCES countries (countryId) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT contacts_fk_4 FOREIGN KEY (cityId) REFERENCES cities (cityId)
);
   
CREATE TABLE IF NOT EXISTS contact_channel (
	ccId INT NOT NULL AUTO_INCREMENT,
    channelId INT,
    contactId INT,
    prefId INT,
    account VARCHAR(45), 
    PRIMARY KEY (ccId),
    KEY (channelId),
    KEY (contactId),
    KEY (prefId),
	CONSTRAINT contact_channel_fk_1 FOREIGN KEY (contactId) REFERENCES contacts (contactId),
	CONSTRAINT contacts_channel_fk_2 FOREIGN KEY (prefId) REFERENCES preference (prefId)
);

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




