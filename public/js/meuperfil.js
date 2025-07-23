document.addEventListener("DOMContentLoaded", () => {
  // === Variáveis para editar dados do perfil esquerdo ===
  const editarDadosBtn = document.getElementById("editar-dados");
  const salvarDadosBtn = document.getElementById("salvar-dados");
  const cancelarDadosBtn = document.getElementById("cancelar-dados");
  const camposUsuario = document.querySelectorAll(".campo-usuario");

  const toggleSenhaBtn = document.getElementById("toggleSenha");
  const senhaCampo = document.getElementById("senha-campo");

  // Armazena valores originais para cancelar edição no perfil esquerdo
  let valoresOriginais = [];

  // Função para permitir só números e controlar maxlength
  function somenteNumeros(event) {
    const tecla = event.key;
    const permitido = /\d/;
    if (!permitido.test(tecla) && tecla !== "Backspace" && tecla !== "Delete" && tecla !== "ArrowLeft" && tecla !== "ArrowRight" && tecla !== "Tab") {
      event.preventDefault();
    }
  }

  // EDITAR DADOS PERFIL ESQUERDO
  editarDadosBtn.addEventListener("click", () => {
    valoresOriginais = [];
    camposUsuario.forEach(campo => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        valoresOriginais.push(input.value);
        span.style.display = "none";
        input.style.display = "block";
      }
    });

    // Mostrar campo senha editável
    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "flex");

    editarDadosBtn.style.display = "none";
    salvarDadosBtn.style.display = "inline-block";
    cancelarDadosBtn.style.display = "inline-block";
  });

  // SALVAR DADOS PERFIL ESQUERDO
  salvarDadosBtn.addEventListener("click", () => {
    // Validação CPF e Telefone
    let cpfInput = null;
    let telefoneInput = null;
    camposUsuario.forEach(campo => {
      const label = campo.querySelector("label").textContent.toLowerCase();
      const input = campo.querySelector("input");
      if (!input) return;
      if (label.includes("cpf")) cpfInput = input;
      if (label.includes("telefone")) telefoneInput = input;
    });

    if (cpfInput && !/^\d{11,14}$/.test(cpfInput.value)) {
      alert("CPF deve conter apenas números (11 a 14 dígitos).");
      cpfInput.focus();
      return;
    }
    if (telefoneInput && !/^\d{10,15}$/.test(telefoneInput.value)) {
      alert("Telefone deve conter apenas números (10 a 15 dígitos).");
      telefoneInput.focus();
      return;
    }

    camposUsuario.forEach(campo => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        span.textContent = input.value;
        span.style.display = "block";
        input.style.display = "none";
      }
    });

    // Esconder campo senha editável
    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "none");

    editarDadosBtn.style.display = "inline-block";
    salvarDadosBtn.style.display = "none";
    cancelarDadosBtn.style.display = "none";
  });

  // CANCELAR EDIÇÃO PERFIL ESQUERDO
  cancelarDadosBtn.addEventListener("click", () => {
    camposUsuario.forEach((campo, i) => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        input.value = valoresOriginais[i];
        span.textContent = valoresOriginais[i];
        span.style.display = "block";
        input.style.display = "none";
      }
    });

    // Esconder campo senha editável
    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "none");

    editarDadosBtn.style.display = "inline-block";
    salvarDadosBtn.style.display = "none";
    cancelarDadosBtn.style.display = "none";
  });

  // Alternar visibilidade da senha no perfil esquerdo
  toggleSenhaBtn.addEventListener("click", () => {
    const tipo = senhaCampo.type === "password" ? "text" : "password";
    senhaCampo.type = tipo;
    toggleSenhaBtn.textContent = tipo === "password" ? "👁️" : "🙈";
  });

  // Permitir somente números em CPF e Telefone (perfil esquerdo)
  camposUsuario.forEach(campo => {
    const label = campo.querySelector("label").textContent.toLowerCase();
    const input = campo.querySelector("input");
    if (!input) return;
    if (label.includes("cpf") || label.includes("telefone")) {
      input.addEventListener("keydown", somenteNumeros);
    }
  });

  // === Código para editar ficha de avaliação (lado direito) ===
  const editarFichaBtn = document.getElementById("editar");
  const salvarFichaBtn = document.getElementById("salvar");
  const formAvaliacao = document.getElementById("form-avaliacao");
  const inputsFicha = formAvaliacao.querySelectorAll("input, textarea");

  editarFichaBtn.addEventListener("click", () => {
    inputsFicha.forEach(input => input.disabled = false);
    editarFichaBtn.style.display = "none";
    salvarFichaBtn.style.display = "inline-block";
  });

  salvarFichaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    inputsFicha.forEach(input => input.disabled = true);
    editarFichaBtn.style.display = "inline-block";
    salvarFichaBtn.style.display = "none";
    alert("Ficha de avaliação salva com sucesso!");
    // Aqui você pode colocar envio para backend
  });
});
