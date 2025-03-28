const db = require('../config/conexaoORacle.js');

module.exports = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM usuarioss', (erro, rows) => {
        if (erro) return reject(erro);
        resolve(rows);
      });
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM usuarioss WHERE id = ?', [id], (erro, row) => {
        if (erro) return reject(erro);
        resolve(row);
      });
    });
  },

  create({ nome, idade, email }) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION', (erro) => {
          if (erro) return reject(erro);

          const sql = 'INSERT INTO usuarioss (nome, idade, email) VALUES (?, ?, ?)';
          db.run(sql, [nome, idade, email], function (erro) {
            if (erro) {
              return db.run('ROLLBACK', (rollbackErr) => {
                if (rollbackErr) return reject(rollbackErr);
                return reject(erro);
              });
            }

            const insertedId = this.lastID;

            db.run('COMMIT', (commitErr) => {
              if (commitErr) {
                return db.run('ROLLBACK', (rollbackErr) => {
                  if (rollbackErr) return reject(rollbackErr);
                  return reject(commitErr);
                });
              }
              resolve({ id: insertedId, nome, idade, email });
            });
          });
        });
      });
    });
  },

  update(id, { nome, idade, email }) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION', (erro) => {
          if (erro) return reject(erro);

          const sql = 'UPDATE usuarioss SET nome = ?, idade = ?, email = ? WHERE id = ?';
          db.run(sql, [nome, idade, email, id], function (erro) {
            if (erro) {
              return db.run('ROLLBACK', (rollbackErr) => {
                if (rollbackErr) return reject(rollbackErr);
                return reject(erro);
              });
            }

            db.run('COMMIT', (commitErr) => {
              if (commitErr) {
                return db.run('ROLLBACK', (rollbackErr) => {
                  if (rollbackErr) return reject(rollbackErr);
                  return reject(commitErr);
                });
              }
              resolve({ id, nome, idade, email });
            });
          });
        });
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('BEGIN TRANSACTION', (erro) => {
          if (erro) return reject(erro);

          db.run('DELETE FROM usuarioss WHERE id = ?', [id], function (erro) {
            if (erro) {
              return db.run('ROLLBACK', (rollbackErr) => {
                if (rollbackErr) return reject(rollbackErr);
                return reject(erro);
              });
            }

            db.run('COMMIT', (commitErr) => {
              if (commitErr) {
                return db.run('ROLLBACK', (rollbackErr) => {
                  if (rollbackErr) return reject(rollbackErr);
                  return reject(commitErr);
                });
              }
              resolve();
            });
          });
        });
      });
    });
  },
};