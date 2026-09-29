// Alternância do tema alto contraste (acessibilidade).
// O tema é aplicado com um atributo no <html>; o CSS troca só as variáveis de cor.
import { salvarTema } from './storage.js';
import { mostrarToast } from './ui.js';

const TEMA = 'alto-contraste';

export function iniciarTema() {
  const botao = document.getElementById('botao-contraste');
  if (!botao) return;
  const raiz = document.documentElement;

  // O script inline do <head> já aplicou o tema salvo; aqui só sincronizamos o botão
  botao.setAttribute('aria-pressed', String(raiz.dataset.tema === TEMA));

  botao.addEventListener('click', () => {
    const ativar = raiz.dataset.tema !== TEMA;
    if (ativar) raiz.dataset.tema = TEMA;
    else delete raiz.dataset.tema;
    botao.setAttribute('aria-pressed', String(ativar));
    salvarTema(ativar ? TEMA : 'padrao');
    // Avisa outros módulos (ex.: gráfico) sem acoplá-los a este arquivo
    document.dispatchEvent(new CustomEvent('semear:tema', { detail: { tema: ativar ? TEMA : 'padrao' } }));
    mostrarToast(ativar ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
  });
}
