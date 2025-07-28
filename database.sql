-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS academiaTCC;
USE academiaTCC;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nasc DATE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, 
    genero VARCHAR(20),
    contato VARCHAR(20),
    tipo ENUM('aluno', 'professor') DEFAULT 'aluno',
    altura FLOAT,
    peso FLOAT,
    medicacao TEXT,
    objetivo VARCHAR(100),
    exame VARCHAR(255),-- Aqui é o nome do arquivo da imagem, se for upload
    comorbidade TEXT,
    motivo TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Tabela de treinos
CREATE TABLE IF NOT EXISTS treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    objetivo VARCHAR(100),
    divisao VARCHAR(50),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES usuario(id) ON DELETE CASCADE
);

