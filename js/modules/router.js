// Roteador SPA baseado em hash: #/rota ou #/rota/id-da-secao
// Funciona no GitHub Pages sem configuração de servidor.

export function iniciarRouter({ rotas, rotaPadrao, rota404, container }) {
  const links = document.querySelectorAll('[data-rota]');

  function lerHash() {
    const [, rota = '', secao = ''] = location.hash.match(/^#\/([^/]*)\/?(.*)$/) || [];
    return { rota: rota || rotaPadrao, secao };
  }

  function renderizar() {
    // Âncoras comuns (ex.: #conteudo do link "pular") não são rotas
    if (location.hash && !location.hash.startsWith('#/')) return;

    const { rota, secao } = lerHash();
    const pagina = rotas[rota] || rota404;

    container.innerHTML = pagina.template();
    document.title = `ONG Semear | ${pagina.titulo}`;

    // Marca o link ativo no menu (acessível via aria-current)
    links.forEach((link) => {
      if (link.dataset.rota === rota) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    // Cada página pode registrar seus próprios eventos depois de desenhada
    if (pagina.montar) pagina.montar(container);

    const alvo = secao && document.getElementById(secao);
    if (alvo) {
      alvo.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      // Leitores de tela anunciam a nova "página"
      container.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', renderizar);
  renderizar();
}
