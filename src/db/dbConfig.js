const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

// Criar uma conexão com suporte a promessas promessas
const db = mysql.createConnection(dbConfig).promise();

// Tentar conectar ao banco de dados
db.connect()
    .then(() => {
        console.log('Conexão bem-sucedida ao banco de dados MySQL');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    });

module.exports = db;
