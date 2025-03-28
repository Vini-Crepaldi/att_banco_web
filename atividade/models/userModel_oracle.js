const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig.js'); 


async function getConnection() {
  const connection = await oracledb.getConnection(dbConfig);
  return connection;
}

module.exports = {
  
  findAll() {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await getConnection();
        const result = await connection.execute('SELECT * FROM usuarioss');
        resolve(result.rows);
      } catch (err) {
        reject(err);
      } finally {
        if (connection) {
          await connection.close();
        }
      }
    });
  },

  findById(id) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await getConnection();  
        const result = await connection.execute(
          'SELECT * FROM usuarioss WHERE id = :id',
          [id]
        );
        
        resolve(result.rows[0]);
      } catch (err) {
        reject(err);
      } finally {
        if (connection) {
          await connection.close();
        }
      }
    });
  },

async create({ nome, idade, email }) {
    let connection;
    try {
      connection = await getConnection(); 
       const result = await connection.execute(
        `INSERT INTO usuarioss (nome, idade, email) VALUES (:nome, :idade, :email) RETURNING id INTO :outId`,
        { nome, idade, email, outId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } },
        { autoCommit: true }
      );
      const insertedId = result.outBinds.outId[0];
      return { id: insertedId, nome, idade, email };
    } catch (err) {
      console.error("Erro ao criar usuario", err.message);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Erro ao fechar conexão:', err.message);
        }
      }
    }
  },

update(id, { nome, idade, email }) {
    return new Promise(async (resolve, reject) => {
      let connection;
      try {
        connection = await getConnection();     
        const sql = 'UPDATE usuarioss SET nome = :nome, idade = :idade, email = :email WHERE id = :id';
        await connection.execute(
          sql,
          [nome, idade, email, id],
          { autoCommit: true }
        );
        resolve({ id, nome, idade, email });
      } catch (err) {
        reject(err);
      } finally {
        if (connection) {
          await connection.close();
        }
      }
    });
  },

async delete(id) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(`DELETE FROM usuarioss WHERE id = :id`, { id }, { autoCommit: true });
      return; 
    } catch (err) {
      console.error('Erro ao excluir usuário:', err.message);
      throw err; 
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Erro ao fechar conexão:', err.message);
        }
      }
    }
  },
};