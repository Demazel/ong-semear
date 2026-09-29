'use strict';

// Menu hambúrguer: abre/fecha a lista de links em telas pequenas
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');

if (botaoMenu && menu) {
  const alternarMenu = (abrir) => {
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('menu--aberto', abrir);
  };

  botaoMenu.addEventListener('click', () => {
    alternarMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha com Esc e devolve o foco ao botão
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('menu--aberto')) {
      alternarMenu(false);
      botaoMenu.focus();
    }
  });

  // Fecha ao escolher um link (útil para âncoras na mesma página)
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) alternarMenu(false);
  });
}
