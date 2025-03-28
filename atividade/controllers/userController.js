const UserModel = require('../models/userModel_oracle.js');

exports.list = async (req, res) => {
  try {
    const usuarios = await UserModel.findAll();
    
    res.render('cadastrar', { title: 'Lista de Usuários', usuarios });
  } catch (err) {
    res.status(500).send('Erro ao listar usuários: ' + err.message);
  }
};

exports.showCreateForm = (req, res) => {
  res.render('cadastrar/form', {
    title: 'Criar Usuário',
    usuario: {},
    action: '/users',
    method: 'POST',
  });
};

exports.showEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserModel.findById(id);
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado!');
    }
    res.render('cadastrar/form', {
      title: 'Editar Usuário',
      usuario,
      action: `/users/${id}?_method=PUT`,
      method: 'POST',
    });
  } catch (err) {
    res.status(500).send('Erro ao buscar usuário: ' + err.message);
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, idade, email } = req.body;
    await UserModel.create({ nome, idade, email });
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Erro ao criar usuário: ' + err.message);
  }
};

exports.update = async (req, res) => {
  try {
    console.log("Parâmetros da requisição (update):", req.params);
    const { id } = req.params;
    console.log("ID do usuário (update):", id);
    const { nome, idade, email } = req.body;
    await UserModel.update(id, { nome, idade, email });
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Erro ao atualizar usuário: ' + err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.delete(id);
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Erro ao excluir usuário: ' + err.message);
  }
};
