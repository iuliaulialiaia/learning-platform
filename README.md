    CREATE DATABASE learning_platform;

    CREATE TYPE user_role AS ENUM ('admin', 'support', 'teacher', 'student');

    CREATE TABLE lp_user (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL,
      role user_role DEFAULT 'student',
      confirmed BOOLEAN DEFAULT FALSE
    );

    INSERT INTO lp_user (username, email, password, role, confirmed)
    VALUES ('admin', 'admin', 'admin', 'admin', TRUE), ('support', 'support', 'support', 'support', TRUE);