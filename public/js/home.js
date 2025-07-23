// Pode ser expandido futuramente com animações, etc.
console.log("Página inicial carregada com sucesso.");

// Animação de scroll
const elementos = document.querySelectorAll('.animar');

function animaScroll() {
  const topoPagina = window.scrollY + window.innerHeight * 0.85;

  elementos.forEach((el) => {
    if (topoPagina > el.offsetTop) {
      el.classList.add('ativo');
    }
  });
}

// Dispara ao carregar e ao rolar
window.addEventListener('scroll', animaScroll);
window.addEventListener('load', animaScroll);

// Animação inicial na home
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero-content');
  hero.classList.add('ativo');
});


