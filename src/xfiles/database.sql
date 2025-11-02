-- CREATE TABLE books(
-- 	id int PRIMARY KEY AUTO_INCREMENT,
-- 	title VARCHAR(255) NOT NULL,
-- 	summary TEXT,
-- 	url_image VARCHAR(255)
-- )

-- INSERT INTO books (title, summary, url_image) VALUES('Historia del rey transparente', 'Historia muy interesante','');
-- INSERT INTO books (title, summary, url_image) VALUES('La furia de Aquiles', 'Historia muy interesante','');


-- SELECT * FROM books;


CREATE DATABASE IF NOT EXISTS landing_admin;

USE landing_admin;

CREATE TABLE tb_prueba (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  mensaje TEXT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tb_prueba (nombre, mensaje)
VALUES
  ('Camilo Bolívar', 'Prueba de conexión exitosa con Node.js'),
  ('SOTECEM', 'Segundo registro insertado correctamente.');

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE banner (
    id_banner INT AUTO_INCREMENT PRIMARY KEY,
    url_imagen VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
    id_city INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ciudad VARCHAR(255) NOT NULL,
    url_imagen VARCHAR(255) NOT NULL
);

CREATE TABLE texts (
    id_text INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE social_networks (
    id_social INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_filename VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE company_icon (
    id_icon INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
