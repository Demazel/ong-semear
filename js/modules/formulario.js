// Página de cadastro: junta máscaras, validação, busca de CEP e localStorage.
import { aplicarMascaras } from './mascaras.js';
import { validarCampo, validarFormulario, marcarCampo } from './validacao.js';
import {
  listarVoluntarios, adicionarVoluntario, removerVoluntario, cpfJaCadastrado,
  lerRascunho, salvarRascunho, limparRascunho,
} from './storage.js';
import { listaVoluntarios } from './templates.js';
import { mostrarToast } from './ui.js';

const CAMPOS_TEXTO = ['nome', 'cpf', 'nascimento', 'email', 'telefone', 'cep',
  'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado'];

function lerDados(form) {
  const dados = Object.fromEntries(CAMPOS_TEXTO.map((nome) => [nome, form.elements[nome].value.trim()]));
  dados.interesse = form.querySelector('input[name="interesse"]:checked')?.value || '';
  return dados;
}

function preencher(form, dados) {
  CAMPOS_TEXTO.forEach((nome) => { if (dados[nome]) form.elements[nome].value = dados[nome]; });
  const radio = form.querySelector(`input[name="interesse"][value="${dados.interesse}"]`);
  if (radio) radio.checked = true;
}

function limparEstados(form) {
  form.querySelectorAll('.campo--erro, .campo--ok').forEach((el) => el.classList.remove('campo--erro', 'campo--ok'));
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  form.querySelectorAll('.erro-campo').forEach((el) => { el.textContent = ''; });
}

async function buscarCep(form) {
  const cep = form.cep.value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    if (dados.erro) {
      marcarCampo(form.cep, 'CEP não encontrado. Preencha o endereço manualmente.');
      return;
    }
    form.logradouro.value = dados.logradouro || '';
    form.bairro.value = dados.bairro || '';
    form.cidade.value = dados.localidade || '';
    form.estado.value = dados.uf || '';
    ['logradouro', 'bairro', 'cidade', 'estado'].forEach((nome) => validarCampo(form, nome));
    salvarRascunho(lerDados(form));
    form.numero.focus();
  } catch {
    // Sem conexão: o usuário preenche o endereço manualmente
  }
}

export function montarCadastro(raiz) {
  const form = raiz.querySelector('#form-cadastro');
  const lista = raiz.querySelector('#lista-voluntarios');
  const alertaErro = raiz.querySelector('#alerta-erro');
  const alertaErroTexto = raiz.querySelector('#alerta-erro-texto');
  const sucesso = raiz.querySelector('#mensagem-sucesso');
  const botaoEnviar = form.querySelector('[type="submit"]');

  const atualizarLista = () => { lista.innerHTML = listaVoluntarios(listarVoluntarios()); };
  atualizarLista();
  aplicarMascaras(form);

  // Recupera o rascunho salvo
  const rascunho = lerRascunho();
  if (rascunho) {
    preencher(form, rascunho);
    mostrarToast('Rascunho recuperado. Continue de onde parou.');
  }

  // Salva o rascunho a cada digitação (com pequeno atraso para não gravar a cada tecla)
  let temporizador;
  form.addEventListener('input', (evento) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => salvarRascunho(lerDados(form)), 400);
    // Se o campo já estava com erro, revalida enquanto o usuário corrige
    const campo = evento.target;
    if (campo.closest('.campo--erro')) validarCampo(form, campo.name);
  });

  // Valida ao sair do campo (feedback imediato, sem incomodar durante a digitação)
  form.addEventListener('focusout', (evento) => {
    const { name, value } = evento.target;
    if (name && name !== 'interesse' && (value || evento.target.closest('.campo--erro'))) validarCampo(form, name);
  });
  form.addEventListener('change', (evento) => {
    if (['interesse', 'termos', 'estado'].includes(evento.target.name)) validarCampo(form, evento.target.name);
  });

  form.cep.addEventListener('blur', () => buscarCep(form));

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    sucesso.hidden = true;

    const erros = validarFormulario(form);
    const dados = lerDados(form);
    if (!erros.length && cpfJaCadastrado(dados.cpf)) {
      marcarCampo(form.cpf, 'Este CPF já está cadastrado.');
      erros.push('cpf');
    }

    if (erros.length) {
      alertaErroTexto.textContent = erros.length === 1
        ? 'Corrija o campo destacado em vermelho.'
        : `Corrija os ${erros.length} campos destacados em vermelho.`;
      alertaErro.hidden = false;
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    alertaErro.hidden = true;
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando...';

    setTimeout(() => {
      if (adicionarVoluntario(dados)) {
        form.reset();
        limparEstados(form);
        limparRascunho();
        atualizarLista();
        sucesso.hidden = false;
        sucesso.focus();
        mostrarToast(`Obrigado, ${dados.nome.split(' ')[0]}! Cadastro enviado.`);
      } else {
        mostrarToast('Não foi possível salvar. Verifique o armazenamento do navegador.', 'erro');
      }
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = 'Enviar cadastro';
    }, 800);
  });

  raiz.querySelector('#limpar-rascunho').addEventListener('click', () => {
    form.reset();
    limparEstados(form);
    limparRascunho();
    alertaErro.hidden = true;
    mostrarToast('Formulário limpo.');
  });

  // Remover cadastro salvo (delegação de eventos na lista)
  lista.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-remover]');
    if (!botao) return;
    removerVoluntario(botao.dataset.remover);
    atualizarLista();
    mostrarToast('Cadastro removido.');
  });
}
