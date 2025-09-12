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
  let { altura, peso, medicacao, objetivo, comorbidade, motivo } = req.body;
  let examePath = null;

  console.log('Dados recebidos no updatePerfil:', req.body);

  // CONVERTER E VALIDAR CAMPOS NUMÉRICOS
  if (altura && altura.trim() !== '') {
    altura = parseFloat(altura.replace(',', '.')); // Converte para float
  } else {
    altura = null; // Se estiver vazio, define como null
  }

  if (peso && peso.trim() !== '') {
    peso = parseFloat(peso.replace(',', '.')); // Converte para float
  } else {
    peso = null; // Se estiver vazio, define como null
  }

  // Garantir que campos de texto não sejam undefined
  medicacao = medicacao || '';
  objetivo = objetivo || '';
  comorbidade = comorbidade || '';
  motivo = motivo || '';

  console.log('Dados processados:', { altura, peso, medicacao, objetivo, comorbidade, motivo });

  if (req.file) {
    examePath = '/uploads/' + req.file.filename;
    console.log('Caminho do exame:', examePath);
  }

  try {
    const user = await User.findByPk(userId);

    // Apaga exame anterior se substituir
    if (examePath && user.exame) {
      const oldPath = path.join(__dirname, '..', 'public', user.exame);
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
        exame: examePath || user.exame,
      },
      { where: { id: userId } }
    );

    console.log('Dados atualizados com sucesso para usuário:', userId);
    res.redirect('/perfil');
  } catch (err) {
    console.error('Erro detalhado ao atualizar perfil:', err);
    res.status(500).send('Erro ao atualizar perfil: ' + err.message);
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
exports.verifyPassword = async (req, res) => {
  const userId = req.session.userId;
  const { senha } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado' });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    res.json({ success: true, message: 'Senha correta' });
  } catch (err) {
    console.error('Erro ao verificar senha:', err);
    res.status(500).json({ success: false, message: 'Erro ao verificar senha' });
  }
};
