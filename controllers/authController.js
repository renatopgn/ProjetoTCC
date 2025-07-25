const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.getCadastro = (req, res) => {
  res.render('cadastro');
};

exports.postCadastro = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    await User.create({ nome, email, senha: hashedSenha });
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
};

exports.postLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.redirect('/auth/login');

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.redirect('/auth/login');

    req.session.userId = user.id;
    res.redirect('/');
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).send('Erro ao fazer login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};
