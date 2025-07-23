CREATE DATABASE IF NOT EXISTS academiaTCC;
USE academiaTCC;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf VARCHAR(14) UNIQUE,
    senha VARCHAR(255),
    data_nasc DATE,
    genero VARCHAR(20),
    contato VARCHAR(20),
    tipo ENUM('aluno', 'professor') DEFAULT 'aluno'
);

CREATE TABLE treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    titulo VARCHAR(100),
    descricao TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);