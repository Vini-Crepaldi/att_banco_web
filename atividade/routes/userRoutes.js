const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const methodOverride=require('method-override')

router.use(methodOverride('_method'));
router.get('/', userController.list);
router.get('/new', userController.showCreateForm);
router.post('/', userController.create);
router.get('/:id/edit', userController.showEditForm); // Rota corrigida para editar
router.put('/:id', userController.update); // Rota corrigida para atualizar
router.delete('/:id', userController.delete);

module.exports = router;




// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./bancoDeDados.db', (err) => {
//   if (err) {
//     console.error('Erro ao conectar', err.message);
//     return;
//   }
//   console.log('Conexão bem sucedida');
// });
// module.exports = db;