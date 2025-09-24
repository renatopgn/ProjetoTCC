
document.addEventListener('DOMContentLoaded', function () {
  const senhaInput = document.getElementById('senha');
  const toggleBtn = document.getElementById('togglePassword');

  toggleBtn.addEventListener('click', function () {
    if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      toggleBtn.textContent = '🙈';
    } else {
      senhaInput.type = 'password';
      toggleBtn.textContent = '👁️';
    }
  });
});

  const cpfInput = document.querySelector('#cpf');

  cpfInput.addEventListener('input', () => {
    let value = cpfInput.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 números

    // Aplica a máscara
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    cpfInput.value = value;
  });

  const telefoneInput = document.querySelector('#contato');

telefoneInput.addEventListener('input', () => {
  let value = telefoneInput.value.replace(/\D/g, ''); // só números

  if (value.length > 11) value = value.slice(0, 11); // máximo 11 dígitos

  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // (xx)
  }
  if (value.length > 7) {
    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2'); // xxxxx-xxxx
  }

  telefoneInput.value = value;
});