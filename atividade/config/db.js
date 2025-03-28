require('dotenv').config;
const sqlite = require('sqlite3').verbose();
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.SQLITE_FILE, (err) => {
  if (err) {
    console.error('Erro ao conectar com SQLite:', err.message);
    return;
  }
  console.log(`Conectado ao SQLite: ${process.env.SQLITE_FILE}`);
});

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    email TEXT
  )
`);

module.exports = db;
