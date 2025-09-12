const Treino = require('../models/Treino');
const User = require('../models/User');

// GET /treinos - Lista treinos conforme tipo do usuário
exports.renderTreinos = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  try {
    const user = await User.findByPk(userId);

    let lista;
    let usuarios = [];

    if (user.tipo === 'professor') {
      // professor pode ver todos os treinos
      lista = await Treino.findAll({ include: User });
      // lista todos os usuários (para select do modal)
      usuarios = await User.findAll();
    } else {
      // aluno só vê os dele
      lista = await Treino.findAll({ where: { userId } });
    }

    res.render('treinos', { lista, user, usuarios });
  } catch (err) {
    console.error('Erro ao carregar treinos:', err);
    res.status(500).send('Erro ao carregar treinos');
  }
};

// POST /treinos/add - Cria treino
exports.addTreino = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  const { nome, descricao, objetivo, divisao, alunoId } = req.body;

  try {
    const user = await User.findByPk(userId);
    let targetUserId = userId;

    if (user.tipo === 'professor' && alunoId) {
      targetUserId = alunoId; // professor escolhe aluno
    }

    await Treino.create({ nome, descricao, objetivo, divisao, userId: targetUserId });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao criar treino:', err);
    res.status(500).send('Erro ao criar treino');
  }
};

// POST /treinos/delete/:id
exports.deleteTreino = async (req, res) => {
  const userId = req.session.userId;
  const treinoId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    let treino;

    if (user.tipo === 'professor') {
      treino = await Treino.findByPk(treinoId);
    } else {
      treino = await Treino.findOne({ where: { id: treinoId, userId } });
    }

    if (!treino) return res.status(404).send('Treino não encontrado');

    await treino.destroy();
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao deletar treino:', err);
    res.status(500).send('Erro ao deletar treino');
  }
};

// POST /treinos/edit/:id
exports.editTreino = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  const { nome, descricao, objetivo, divisao } = req.body;

  try {
    const user = await User.findByPk(userId);
    let treino;

    if (user.tipo === 'professor') {
      treino = await Treino.findByPk(id);
    } else {
      treino = await Treino.findOne({ where: { id, userId } });
    }

    if (!treino) return res.status(404).send('Treino não encontrado');

    await treino.update({ nome, descricao, objetivo, divisao });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao editar treino:', err);
    res.status(500).send('Erro ao editar treino');
  }
};
