const db = require('../config/db');

// Mostra o perfil do usuário
exports.getPerfil = (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar perfil:', err);
      return res.status(500).send('Erro ao carregar perfil');
    }

    res.render('perfil', { user: results[0] });
  });
};

// Atualiza o perfil do usuário
exports.updatePerfil = (req, res) => {
  const userId = req.session.userId;
  const { idade, altura, peso, objetivo } = req.body;

  const sql = `
    UPDATE users 
    SET idade = ?, altura = ?, peso = ?, objetivo = ?
    WHERE id = ?
  `;

  db.query(sql, [idade, altura, peso, objetivo, userId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar perfil:', err);
      return res.status(500).send('Erro ao atualizar perfil');
    }

    res.redirect('/perfil');
  });
};
