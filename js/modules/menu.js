// Menu hambúrguer: abre/fecha a lista de links em telas pequenas.
export function iniciarMenu() {
  const botao = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu-principal');
  if (!botao || !menu) return;

  const alternar = (abrir) => {
    botao.setAttribute('aria-expanded', String(abrir));
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('menu--aberto', abrir);
  };

  botao.addEventListener('click', () => alternar(botao.getAttribute('aria-expanded') !== 'true'));

  // Esc fecha e devolve o foco ao botão
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('menu--aberto')) {
      alternar(false);
      botao.focus();
    }
  });

  // Escolher um link fecha o menu (a rota muda sem recarregar a página)
  menu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) alternar(false);
  });
}
