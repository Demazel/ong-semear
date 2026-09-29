// Componentes de interface reutilizáveis: toast e modal.

export function mostrarToast(mensagem, tipo = 'sucesso') {
  let area = document.querySelector('.toast-area');
  if (!area) {
    area = document.createElement('div');
    area.className = 'toast-area';
    area.setAttribute('role', 'status');
    area.setAttribute('aria-live', 'polite');
  }
  // Com um modal aberto, o toast entra dentro dele para ficar acima do fundo escurecido
  (document.querySelector('dialog[open]') || document.body).append(area);

  const toast = document.createElement('p');
  toast.className = `toast toast--${tipo}`;
  toast.textContent = mensagem;
  area.append(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visivel'));
  setTimeout(() => {
    toast.classList.remove('toast--visivel');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Liga os botões de abrir/fechar <dialog> e de copiar texto dentro de uma área
export function montarModais(raiz) {
  raiz.querySelectorAll('[data-abrir-modal]').forEach((botao) => {
    const modal = raiz.querySelector(`#${botao.dataset.abrirModal}`);
    if (!modal) return;
    botao.addEventListener('click', () => modal.showModal());
    modal.addEventListener('click', (evento) => {
      if (evento.target === modal) modal.close(); // clique no fundo
    });
  });

  raiz.querySelectorAll('[data-fechar-modal]').forEach((botao) => {
    botao.addEventListener('click', () => botao.closest('dialog').close());
  });

  raiz.querySelectorAll('[data-copiar]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(botao.dataset.copiar);
        mostrarToast('Chave PIX copiada!');
      } catch {
        mostrarToast('Não foi possível copiar. Copie manualmente.', 'erro');
      }
    });
  });
}
