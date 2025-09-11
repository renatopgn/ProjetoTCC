document.addEventListener("DOMContentLoaded", () => {
  // === Variáveis para editar dados do perfil esquerdo ===
  const editarDadosBtn = document.getElementById("editar-dados");
  const salvarDadosBtn = document.getElementById("salvar-dados");
  const cancelarDadosBtn = document.getElementById("cancelar-dados");
  const camposUsuario = document.querySelectorAll(".campo-usuario");

  const toggleSenhaBtn = document.getElementById("toggleSenha");
  const senhaCampo = document.getElementById("senha-campo");

  let valoresOriginais = [];

  // Função para formatar CPF
  function formatarCPF(cpf) {
    if (!cpf) return '';
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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

  function somenteNumeros(event) {
    const tecla = event.key;
    const permitido = /\d/;
    if (!permitido.test(tecla) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(tecla)) {
      event.preventDefault();
    }
  }

  // Máscara de CPF durante a digitação
  const cpfInput = document.querySelector('input[name="cpf"]');
  if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      
      // Aplica máscara: 000.000.000-00
      if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
      } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
      }
      e.target.value = value;
    });
  }

  // Máscara de telefone durante a digitação
  const telInput = document.querySelector('input[name="contato"]');
  if (telInput) {
    telInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      
      // Aplica máscara: (00) 00000-0000 ou (00) 0000-0000
      if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      } else if (value.length > 0) {
        value = value.replace(/(\d{0,2})/, "($1");
      }
      e.target.value = value;
    });
  }

  // === EDITAR DADOS PERFIL ESQUERDO ===
  editarDadosBtn.addEventListener("click", () => {
    valoresOriginais = [];
    camposUsuario.forEach(campo => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        // Salva o valor original (sem formatação para CPF e telefone)
        let valorOriginal = input.value;
        if (input.name === 'cpf') {
          valorOriginal = valorOriginal.replace(/\D/g, '');
        } else if (input.name === 'contato') {
          valorOriginal = valorOriginal.replace(/\D/g, '');
        }
        valoresOriginais.push(valorOriginal);
        
        // Preenche o input com o valor original (sem formatação)
        input.value = valorOriginal;
        span.style.display = "none";
        input.style.display = "block";
      }
    });

    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "flex");

    editarDadosBtn.style.display = "none";
    salvarDadosBtn.style.display = "inline-block";
    cancelarDadosBtn.style.display = "inline-block";
  });

  // === SALVAR DADOS PERFIL ESQUERDO ===
  salvarDadosBtn.addEventListener("click", async () => {
   let cpfInput = document.querySelector('input[name="cpf"]');
  let telefoneInput = document.querySelector('input[name="contato"]');
  let senhaInput = document.getElementById("senha-campo");

  // Aplica formatação antes de enviar
  if (cpfInput) {
    cpfInput.value = formatarCPF(cpfInput.value.replace(/\D/g, ""));
  }
  if (telefoneInput) {
    telefoneInput.value = formatarTelefone(telefoneInput.value.replace(/\D/g, ""));
  }

  // Validações
  if (cpfInput && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfInput.value)) {
    alert("CPF deve estar no formato: 000.000.000-00");
    cpfInput.focus();
    return;
  }

  if (telefoneInput && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(telefoneInput.value)) {
    alert("Telefone deve estar no formato: (00) 00000-0000 ou (00) 0000-0000");
    telefoneInput.focus();
    return;
  }

    // Atualiza spans com formatação
    camposUsuario.forEach(campo => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        if (input.name === 'senha') {
          span.textContent = "********";
        } else if (input.name === 'cpf') {
          span.textContent = formatarCPF(input.value);
        } else if (input.name === 'contato') {
          span.textContent = formatarTelefone(input.value);
        } else {
          span.textContent = input.value;
        }
        span.style.display = "block";
        input.style.display = "none";
      }
    });

    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "none");

    editarDadosBtn.style.display = "inline-block";
    salvarDadosBtn.style.display = "none";
    cancelarDadosBtn.style.display = "none";

    // === Enviar para backend ===
    const dadosUsuario = {};
     camposUsuario.forEach(campo => {
    const input = campo.querySelector("input");
    if (input && input.name) {
      // Envia o valor JÁ FORMATADO para o backend
      dadosUsuario[input.name] = input.value;
    }
  });

    try {
      const resp = await fetch("/perfil/update-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario)
      });
      
      const result = await resp.json();
      
      if (result.success) {
        alert("Dados do perfil atualizados com sucesso!");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar os dados do perfil!");
    }
  });

  // === CANCELAR EDIÇÃO ===
  cancelarDadosBtn.addEventListener("click", () => {
    camposUsuario.forEach((campo, i) => {
      const span = campo.querySelector("span");
      const input = campo.querySelector("input");
      if (input) {
        // Para senha, reseta para vazio e mantém asteriscos no span
        if (input.name === 'senha') {
          input.value = "";
          span.textContent = "********";
        } else if (input.name === 'cpf') {
          input.value = valoresOriginais[i];
          span.textContent = formatarCPF(valoresOriginais[i]);
        } else if (input.name === 'contato') {
          input.value = valoresOriginais[i];
          span.textContent = formatarTelefone(valoresOriginais[i]);
        } else {
          input.value = valoresOriginais[i];
          span.textContent = valoresOriginais[i];
        }
        span.style.display = "block";
        input.style.display = "none";
      }
    });

    document.querySelectorAll(".senha-wrapper").forEach(div => div.style.display = "none");

    editarDadosBtn.style.display = "inline-block";
    salvarDadosBtn.style.display = "none";
    cancelarDadosBtn.style.display = "none";
  });

  // === TOGGLE VISUALIZAÇÃO DE SENHA ===
  toggleSenhaBtn.addEventListener("click", () => {
    const tipo = senhaCampo.type === "password" ? "text" : "password";
    senhaCampo.type = tipo;
    toggleSenhaBtn.textContent = tipo === "password" ? "👁️" : "🙈";
  });

  // === APLICA RESTRIÇÃO DE APENAS NÚMEROS ===
  camposUsuario.forEach(campo => {
    const label = campo.querySelector("label").textContent.toLowerCase();
    const input = campo.querySelector("input");
    if (!input) return;
    if (label.includes("cpf") || label.includes("telefone")) {
      input.addEventListener("keydown", somenteNumeros);
    }
  });

  // === FICHA DE AVALIAÇÃO (DIREITA) ===
const editarFichaBtn = document.getElementById("editar");
const salvarFichaBtn = document.getElementById("salvar");
const inputsFicha = document.querySelectorAll("#form-avaliacao input, #form-avaliacao textarea");

// Botão Editar
editarFichaBtn.addEventListener("click", () => {
  inputsFicha.forEach(input => input.disabled = false);
  editarFichaBtn.style.display = "none";
  salvarFichaBtn.style.display = "inline-block";
});

// ⛔️ REMOVA TODO O EVENT LISTENER DO BOTÃO SALVAR
// O formulário será enviado automaticamente pelo navegador
// pois o botão é type="submit" e o form tem action="/perfil/update"

// Apenas adicione um event listener para mostrar loading durante o envio
document.getElementById("form-avaliacao").addEventListener("submit", function() {
  inputsFicha.forEach(input => input.disabled = true);
  editarFichaBtn.style.display = "inline-block";
  salvarFichaBtn.style.display = "none";
  salvarFichaBtn.textContent = "Salvando...";
  salvarFichaBtn.disabled = true;
});
});
