const User = require('../models/User');
const path = require('path');
const fs = require('fs');

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
  const { altura, peso, medicacao, objetivo, comorbidade, motivo } = req.body;
  let exameFotoPath = null;

  if (req.file) {
    exameFotoPath = '/uploads/' + req.file.filename;
  }

  try {
    const user = await User.findByPk(userId);

    // Apaga exame anterior se estiver substituindo
    if (exameFotoPath && user.exameFoto) {
      const oldPath = path.join(__dirname, '..', 'public', user.exameFoto);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await User.update(
      {
        altura,
        peso,
        medicacao,
        objetivo,
        comorbidade,
        motivo,
        exameFoto: exameFotoPath || user.exameFoto,
      },
      { where: { id: userId } }
    );

    res.redirect('/perfil');
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).send('Erro ao atualizar perfil');
  }
};
