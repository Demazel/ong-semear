// Ponto de entrada da SPA: registra as rotas e inicia os módulos globais.
import { iniciarRouter } from './modules/router.js';
import { iniciarMenu } from './modules/menu.js';
import { iniciarTema } from './modules/tema.js';
import { montarModais } from './modules/ui.js';
import { montarCadastro } from './modules/formulario.js';
import { montarGraficoTransparencia } from './modules/grafico.js';
import { paginaInicio, paginaProjetos, paginaCadastro, pagina404 } from './modules/templates.js';

const app = document.getElementById('app');

iniciarMenu();
iniciarTema();

// "Pular para o conteúdo" sem alterar a rota atual
document.querySelector('.pular-link').addEventListener('click', (evento) => {
  evento.preventDefault();
  app.focus();
});

iniciarRouter({
  container: app,
  rotaPadrao: 'inicio',
  rotas: {
    inicio: { titulo: 'Início', template: paginaInicio },
    projetos: {
      titulo: 'Nossos Projetos',
      template: paginaProjetos,
      montar: (raiz) => {
        montarModais(raiz);
        montarGraficoTransparencia(raiz);
      },
    },
    cadastro: { titulo: 'Seja Voluntário', template: paginaCadastro, montar: montarCadastro },
  },
  rota404: { titulo: 'Página não encontrada', template: pagina404 },
});
