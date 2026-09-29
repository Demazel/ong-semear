// Build de produção com Vite: junta e minifica CSS e JS, minifica o HTML e gera a pasta dist/.
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync } from 'node:fs';

// Remove comentários e espaços repetidos do HTML (o Vite não minifica HTML por padrão).
// Seguro aqui porque os scripts inline do projeto só usam comentários /* */.
const minificarHtml = () => ({
  name: 'minificar-html',
  transformIndexHtml: {
    order: 'post',
    handler: (html) => html.replace(/<!--(?!\[)[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim(),
  },
});

// As imagens dos cards são montadas nos templates JS como strings ('../imagens/...'),
// então o Vite não as enxerga no grafo de dependências: copiamos a pasta inteira.
const copiarImagens = () => ({
  name: 'copiar-imagens',
  closeBundle: () => cpSync('imagens', 'dist/imagens', { recursive: true }),
});

export default defineConfig({
  // Caminhos relativos: funciona em https://demazel.github.io/ong-semear/ e em qualquer servidor local
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    rollupOptions: {
      input: {
        app: resolve('html/index.html'),
        // Páginas da raiz que redirecionam para a SPA (mantêm os links antigos)
        raiz: resolve('index.html'),
        projetos: resolve('projetos.html'),
        cadastro: resolve('cadastro.html'),
      },
      // O Chart.js continua vindo da CDN sob demanda
      external: [/^https:\/\//],
    },
  },
  plugins: [minificarHtml(), copiarImagens()],
});
