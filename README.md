
    CREATE DATABASE learning_platform;

    CREATE TABLE _user (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL,
      confirmed BOOLEAN DEFAULT FALSE
    );

    INSERT INTO _user (username, email, password, confirmed)
    VALUES ('admin', 'admin', '$2a$10$lpaTmKlrS/n8eRsuTNTle.flpQJN3Gp6f0E.MGGCDeY.do0Em9yJW', true);

    CREATE TABLE password_reset (
      id SERIAL PRIMARY KEY,
      token VARCHAR(343) NOT NULL,
      user_id INTEGER NOT NULL REFERENCES _user(id)
    );

    CREATE TYPE category AS ENUM ('Geografie', 'Biologie', 'Istorie', 'Inteligență emoțională', 'Programarea calculatoarelor', 'Chimie', 'Matematică', 'Fizică', 'Engleză');

    CREATE TABLE course (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      subtitle VARCHAR(255),
      category category NOT NULL,
      _date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      description VARCHAR(65535)
    );