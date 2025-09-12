const User = require('../models/User');
const Treino = require('../models/Treino');

// Garantir que usuário está logado
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
};

// Verificar se é professor
exports.isProfessor = async (req, res, next) => {
  const user = await User.findByPk(req.session.userId);
  if (user && user.tipo === 'professor') {
    return next();
  }
  return res.status(403).send("Acesso negado: apenas professores.");
};

// Verificar se treino pertence ao aluno logado
exports.isOwnerOrProfessor = async (req, res, next) => {
  const user = await User.findByPk(req.session.userId);
  const treino = await Treino.findByPk(req.params.id);

  if (!treino) return res.status(404).send("Treino não encontrado");

  // Dono pode alterar
  if (treino.userId === req.session.userId) return next();

  // Professor pode alterar treino de alunos que ele gerencia
  if (user.tipo === 'professor') return next();

  return res.status(403).send("Acesso negado");
};
