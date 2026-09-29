// Gráfico de transparência com Chart.js (biblioteca externa via CDN, versão fixa).
// É carregado sob demanda com import() dinâmico: só baixa quando a rota de projetos abre.
import { transparencia } from './dados.js';

const CHART_JS = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/+esm';
const emReais = (texto) => Number(texto.replace(/\D/g, ''));

let graficoAtual = null;

export async function montarGraficoTransparencia(raiz) {
  const canvas = raiz.querySelector('#grafico-transparencia');
  if (!canvas) return;

  try {
    const { Chart, registerables } = await import(CHART_JS);
    Chart.register(...registerables);

    // Cores lidas das variáveis do Design System, sem duplicar valores no JS
    const css = getComputedStyle(document.documentElement);
    const cor = (nome) => css.getPropertyValue(nome).trim();

    graficoAtual?.destroy(); // evita gráficos duplicados ao voltar para a rota
    graficoAtual = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: transparencia.map(([projeto]) => projeto),
        datasets: [
          { label: 'Arrecadado', data: transparencia.map(([, a]) => emReais(a)), backgroundColor: cor('--cor-primaria') },
          { label: 'Aplicado', data: transparencia.map(([, , b]) => emReais(b)), backgroundColor: cor('--cor-secundaria') },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
            },
          },
        },
        scales: {
          y: { ticks: { callback: (valor) => `R$ ${(valor / 1000).toLocaleString('pt-BR')} mil` } },
        },
      },
    });
    canvas.closest('.grafico').hidden = false;
  } catch {
    // Sem conexão com a CDN: a tabela continua exibindo os mesmos dados
  }
}
