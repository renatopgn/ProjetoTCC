function abrirModal() {
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('formTreino').reset();
  document.getElementById('formTreino').action = '/treinos/add'; // volta para adicionar
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

function toggleFavorito(button) {
  const card = button.closest('.treino-card');
  const lista = document.getElementById('listaTreinos');
  const isFavorito = card.classList.contains('favorito');

  button.classList.add('animate');
  setTimeout(() => button.classList.remove('animate'), 300);

  if (isFavorito) {
    card.classList.remove('favorito');
    button.classList.remove('ativo');
    lista.appendChild(card);
  } else {
    card.classList.add('favorito');
    button.classList.add('ativo');
    lista.prepend(card);
  }
}

function editarTreino(btn) {
  const card = btn.closest('.treino-card');

  const id = card.dataset.id;
  const nome = card.dataset.nome;
  const descricao = card.dataset.descricao;
  const objetivo = card.dataset.objetivo;
  const divisao = card.dataset.divisao;

  document.getElementById('treinoId').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('descricao').value = descricao;
  document.getElementById('objetivo').value = objetivo;
  document.getElementById('divisao').value = divisao;

  const form = document.getElementById('formTreino');
  form.action = `/treinos/edit/${id}`; // troca para editar

  abrirModal();
}

