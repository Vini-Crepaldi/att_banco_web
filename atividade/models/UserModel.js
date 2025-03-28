const db = require('../config/db.js');

module.exports = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM usuarios', (erro, rows) => {
        if (erro) return reject(erro);
        resolve(rows);
      });
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM usuarios WHERE id = ?', [id], (erro, row) => {
        if (erro) return reject(erro);
        resolve(row);
      });
    });
  },

  create({ nome, idade, email }) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO usuarios (nome, idade, email) VALUES (?, ?, ?)';
      db.run(sql, [nome, idade, email], function (erro) {
        if (erro) return reject(erro);
        resolve({ id: this.lastID, nome, idade, email });
      });
    });
  },

  update(id, { nome, idade, email }) {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE usuarios SET nome = ?, idade = ?, email = ? WHERE id = ?';
      db.run(sql, [nome, idade, email, id], function (erro) {
        if (erro) return reject(erro);
        resolve({ id, nome, idade, email });
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM usuarios WHERE id = ?', [id], function (erro) {
        if (erro) return reject(erro);
        resolve();
      });
    });
  },
};