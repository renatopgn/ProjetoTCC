const Treino = require('../models/Treino');

// GET /treinos - Lista todos os treinos do usuário logado
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

// POST /treinos/create - Cria um novo treino para o usuário logado
exports.createTreino = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  const { nome, descricao, objetivo, divisao } = req.body;

  try {
    await Treino.create({ nome, descricao, objetivo, divisao, userId });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao criar treino:', err);
    res.status(500).send('Erro ao criar treino');
  }
};

// POST /treinos/delete/:id - Deleta um treino do usuário
exports.deleteTreino = async (req, res) => {
  const userId = req.session.userId;
  const treinoId = req.params.id;

  try {
    const treino = await Treino.findOne({ where: { id: treinoId, userId } });

    if (!treino) return res.status(404).send('Treino não encontrado');

    await treino.destroy();
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao deletar treino:', err);
    res.status(500).send('Erro ao deletar treino');
  }
};

// POST /treinos/edit/:id - Edita um treino do usuário
exports.editTreino = async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.params;
  const { nome, descricao, objetivo, divisao } = req.body;

  try {
    const treino = await Treino.findOne({ where: { id, userId } });

    if (!treino) return res.status(404).send('Treino não encontrado');

    await treino.update({ nome, descricao, objetivo, divisao });
    res.redirect('/treinos');
  } catch (err) {
    console.error('Erro ao editar treino:', err);
    res.status(500).send('Erro ao editar treino');
  }
};
