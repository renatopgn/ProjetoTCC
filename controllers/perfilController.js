const User = require('../models/User');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// Função para formatar CPF
function formatarCPF(cpf) {
  if (!cpf) return '';
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
}

// Função para formatar telefone
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
  console.log('==== BODY RECEBIDO ====');
  console.log(req.body);
  if (!userId) return res.status(401).json({ success: false, message: 'Usuário não autenticado' });

  try {
    let { altura, peso, medicacao, objetivo, comorbidade, motivo } = req.body;

    console.log('Dados recebidos no updatePerfil:', req.body);

    // Conversão e validação de campos numéricos
    altura = altura && altura.trim() !== '' ? parseFloat(altura.replace(',', '.')) : null;
    peso = peso && peso.trim() !== '' ? parseFloat(peso.replace(',', '.')) : null;

    // Campos de texto
    medicacao = medicacao || '';
    objetivo = objetivo || '';
    comorbidade = comorbidade || '';
    motivo = motivo || '';

    // Atualização no banco
    await User.update(
      { altura, peso, medicacao, objetivo, comorbidade, motivo },
      { where: { id: userId } }
    );

    console.log('Ficha de avaliação atualizada com sucesso para usuário:', userId);

    return res.json({ success: true, message: 'Ficha de avaliação atualizada com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    return res.status(500).json({ success: false, message: 'Erro ao atualizar perfil.' });
  }
};

// MÉTODO PARA ATUALIZAR INFORMAÇÕES PESSOAIS
exports.updateInfo = async (req, res) => {
  const userId = req.session.userId;
  const { nome, senha, data_nasc, cpf, contato } = req.body;

  try {
    const updateData = {
      nome,
      data_nasc,
      cpf: formatarCPF(cpf), // FORMATA O CPF ANTES DE SALVAR
      contato: formatarTelefone(contato) // FORMATA O TELEFONE ANTES DE SALVAR
    };

    // Só atualiza a senha se for fornecida e não estiver vazia
    if (senha && senha.trim() !== "") {
      const hashedPassword = await bcrypt.hash(senha, 10);
      updateData.senha = hashedPassword;
    }

    await User.update(updateData, { where: { id: userId } });

    res.json({ success: true, message: 'Dados atualizados com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar informações:', err);
    res.status(500).json({ success: false, message: 'Erro ao atualizar informações' });
  }
};

// Verifica senha antes de permitir edição
exports.verificarSenha = async (req, res) => {
  const userId = req.session.userId;
  const { senha } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    return res.json({ success: true, message: 'Senha correta' });
  } catch (err) {
    console.error('Erro ao verificar senha:', err);
    return res.status(500).json({ success: false, message: 'Erro ao verificar senha' });
  }
};
