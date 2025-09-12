const User = require('../models/User');
const { Op } = require('sequelize');

// Listagem + busca
exports.getUsuarios = async (req, res) => {
  const query = req.query.q || '';
  try {
    const usuarios = await User.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${query}%` } },
          { cpf: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.render('usuarios', { usuarios, query });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar usuários");
  }
};

// Alterar tipo (Aluno <-> Professor)
exports.alterarTipo = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await User.findByPk(id);
    if (!usuario) return res.status(404).send("Usuário não encontrado");

    usuario.tipo = req.body.tipo ? "professor" : "aluno";
    await usuario.save();

    res.redirect('/usuarios');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao alterar tipo de usuário");
  }
};

// Excluir usuário
exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await User.destroy({ where: { id } });
    res.redirect('/usuarios');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir usuário");
  }
};
