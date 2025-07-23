const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.loginPage = (req, res) => {
  res.render('login');
};

exports.cadastroPage = (req, res) => {
  res.render('cadastro');
};

exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.send('Usuário não encontrado');

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.send('Senha incorreta');

  req.session.userId = user.id;
  res.redirect('/');
};

exports.registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  await User.create({ nome, email, senha: hash });
  res.redirect('/auth/login');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
