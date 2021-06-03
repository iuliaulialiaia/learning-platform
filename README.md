
    CREATE DATABASE learning_platform;

    CREATE TYPE extension AS ENUM ('png', 'jpg', 'jpeg', 'gif', 'webp');

    CREATE TABLE _user (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL,
      confirmed BOOLEAN DEFAULT FALSE,
      image_type extension,
      title VARCHAR(255),
      description VARCHAR(65535),
      contact JSONB,
      work JSONB,
      education JSONB,
      award JSONB,
      book JSONB
    );

    CREATE TABLE password_reset (
      id SERIAL PRIMARY KEY,
      token VARCHAR(343) NOT NULL,
      user_id INTEGER NOT NULL REFERENCES _user(id)
    );
