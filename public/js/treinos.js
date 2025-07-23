let idEdicao = null;

function abrirModal() {
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
  idEdicao = null;
  limparCampos();
}

function limparCampos() {
  document.getElementById('nome').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('objetivo').value = '';
  document.getElementById('divisao').value = '';
}

function adicionarTreino() {
  const nome = document.getElementById('nome').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const objetivo = document.getElementById('objetivo').value.trim();
  const divisao = document.getElementById('divisao').value.trim();

  if (!nome || !descricao || !objetivo || !divisao) {
    alert("Preencha todos os campos!");
    return;
  }

  if (idEdicao) {
    const card = document.querySelector(`.card-treino[data-id='${idEdicao}']`);
    if (card) {
      atualizarCard(card, nome, descricao, objetivo, divisao);
    }
    idEdicao = null;
  } else {
    criarNovoCard(nome, descricao, objetivo, divisao);
  }

  fecharModal();
}

function criarNovoCard(nome, descricao, objetivo, divisao) {
  const card = document.createElement('div');
  card.className = 'card-treino';

  const id = Date.now();
  card.dataset.id = id;

  atualizarCard(card, nome, descricao, objetivo, divisao);

  document.getElementById('listaTreinos').appendChild(card);
}

function atualizarCard(card, nome, descricao, objetivo, divisao) {
  card.innerHTML = `
  <div class="menu-container">
    <button class="favorito-btn" onclick="toggleFavorito(this)">♥</button>
    <button class="menu-btn" onclick="toggleMenu(this)">⋮</button>
    <div class="menu-dropdown">
      <button onclick="editarTreino(this)">Editar</button>
      <button onclick="excluirTreino(this)">Excluir</button>
    </div>
  </div>
  <h3>${nome}</h3>
  <p><strong>Objetivo:</strong> ${objetivo}</p>
  <p><strong>Divisão:</strong> ${divisao}</p>
  <p class="descricao-curta">${descricao}</p>
  <button class="view-btn" onclick='verDetalhes(\`${nome}\`, \`${descricao}\`, \`${objetivo}\`, \`${divisao}\`)'>Ver</button>
`;


  card.dataset.nome = nome;
  card.dataset.descricao = descricao;
  card.dataset.objetivo = objetivo;
  card.dataset.divisao = divisao;
}

function verDetalhes(nome, descricao, objetivo, divisao) {
  const modalDetalhes = document.createElement('div');
  modalDetalhes.className = 'modal-overlay';
  modalDetalhes.style.display = 'flex';
  modalDetalhes.innerHTML = `
    <div class="modal">
      <h2>${nome}</h2>
      <p><strong>Objetivo:</strong> ${objetivo}</p>
      <p><strong>Divisão:</strong> ${divisao}</p>
      <p>${descricao}</p>
      <div class="modal-buttons">
        <button onclick="document.body.removeChild(this.closest('.modal-overlay'))">Fechar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalDetalhes);
}

function toggleMenu(button) {
  const dropdown = button.nextElementSibling;
  dropdown.classList.toggle('show');

  document.addEventListener("click", function fechar(e) {
    if (!dropdown.contains(e.target) && e.target !== button) {
      dropdown.classList.remove('show');
      document.removeEventListener("click", fechar);
    }
  });
}

function editarTreino(btn) {
  const card = btn.closest('.card-treino');
  idEdicao = card.dataset.id;

  document.getElementById('nome').value = card.dataset.nome;
  document.getElementById('descricao').value = card.dataset.descricao;
  document.getElementById('objetivo').value = card.dataset.objetivo;
  document.getElementById('divisao').value = card.dataset.divisao;

  abrirModal();
}

function excluirTreino(btn) {
  const card = btn.closest('.card-treino');
  card.remove();
}

function toggleFavorito(button) {
  const card = button.closest('.card-treino');
  const lista = document.getElementById('listaTreinos');

  const isFavorito = card.classList.contains('favorito');

  // Aplica animação
  button.classList.add('animate');
  setTimeout(() => button.classList.remove('animate'), 300); // remove após animação

  if (isFavorito) {
    card.classList.remove('favorito');
    button.classList.remove('ativo');
    lista.appendChild(card); // volta para o final
  } else {
    card.classList.add('favorito');
    button.classList.add('ativo');
    lista.prepend(card); // vai para o topo
  }
}

