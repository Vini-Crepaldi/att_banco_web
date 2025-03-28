const oracledb = require('oracledb');
require('dotenv').config();

async function ConexaoOracle() {
  try {
    const conexao = await oracledb.getConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      connectionString: process.env.CONNECTIONSTRING,
    });
    console.log('Conectado ao Banco de Dados Oracle!');
    return conexao;
  } catch (erro) {
    console.error('Erro ao conectar com o Oracle:', erro.message);
    return null;
  }
}


module.exports = ConexaoOracle;