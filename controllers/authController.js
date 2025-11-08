const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.getCadastro = (req, res) => {
  res.render('cadastro');
};

exports.postCadastro = async (req, res) => {
  const {  nome, data_nasc, cpf, senha, genero, contato  } = req.body;

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);
    console.log('Dados recebidos:', req.body);
    await User.create({  
      nome,
      data_nasc,
      cpf,
      senha: hashedSenha,
      genero,
      contato });
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
res.status(500).send(`Erro ao cadastrar usuário: ${error.message}`);
  }
};

exports.postLogin = async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const user = await User.findOne({ where: { cpf } });
    if (!user) {
      return res.render('login', { error: 'Conta não encontrada. Verifique o CPF e tente novamente.' });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.render('login', { error: 'Senha incorreta. Tente novamente.' });
    }

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
function formatarTelefone(telefone) {
  if (!telefone) return '';
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length === 11) {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (telefone.length === 10) {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return telefone;
}