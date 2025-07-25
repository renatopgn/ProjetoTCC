const User = require('../models/User');

exports.getPerfil = async (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  try {
    const user = await User.findByPk(userId);
    res.render('perfil', { user });
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    res.status(500).send('Erro ao carregar perfil');
  }
};

exports.updatePerfil = async (req, res) => {
  const userId = req.session.userId;
  const { idade, altura, peso, objetivo, genero, nivel } = req.body;

  try {
    await User.update(
      { idade, altura, peso, objetivo, genero, nivel },
      { where: { id: userId } }
    );
    res.redirect('/perfil');
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).send('Erro ao atualizar perfil');
  }
};
