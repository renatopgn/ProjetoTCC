const Treino = require('../models/Treino');

exports.renderTreinos = async (req, res) => {
  const userId = req.session.userId;
  const treinos = await Treino.findByUser(userId);
  res.render('treinos', { treinos });
};

exports.addTreino = async (req, res) => {
  const { nome, descricao, objetivo, divisao } = req.body;
  await Treino.create({ user_id: req.session.userId, nome, descricao, objetivo, divisao });
  res.redirect('/treinos');
};

exports.deleteTreino = async (req, res) => {
  const treinoId = req.params.id;
  await Treino.delete(treinoId, req.session.userId);
  res.redirect('/treinos');
};

exports.editTreino = async (req, res) => {
  const treinoId = req.params.id;
  const { nome, descricao, objetivo, divisao } = req.body;
  await Treino.update(treinoId, { nome, descricao, objetivo, divisao });
  res.redirect('/treinos');
};
