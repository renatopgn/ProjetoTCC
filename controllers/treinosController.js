const Treino = require('../models/Treino');

exports.getTreinos = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  try {
    const lista = await Treino.findAll({ where: { userId } });
    res.render('treinos', { lista });
  } catch (err) {
    console.error('Erro ao carregar treinos:', err);
    res.status(500).send('Erro ao carregar treinos');
  }
};

exports.createTreino = async (req, res) => {
  const userId = req.session.userId;
  const { nome, descricao, objetivo, divisao } = req.body;

  try {
    await Treino.create({ nome, descricao, objetivo, divisao, userId });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao criar treino:', err);
    res.status(500).send('Erro ao criar treino');
  }
};

exports.deleteTreino = async (req, res) => {
  const treinoId = req.params.id;

  try {
    await Treino.destroy({ where: { id: treinoId } });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao deletar treino:', err);
    res.status(500).send('Erro ao deletar treino');
  }
};

exports.editTreino = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  const { nome, descricao, objetivo, divisao } = req.body;

  try {
    const treino = await Treino.findOne({ where: { id, userId } });

    if (!treino) {
      return res.status(404).send('Treino não encontrado');
    }

    await treino.update({ nome, descricao, objetivo, divisao });

    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao editar treino:', err);
    res.status(500).send('Erro ao editar treino');
  }
};

