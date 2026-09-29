// Camada única de acesso ao localStorage (com prefixo e tratamento de erro).
const PREFIXO = 'semear:';

function ler(chave, padrao) {
  try {
    const valor = localStorage.getItem(PREFIXO + chave);
    return valor ? JSON.parse(valor) : padrao;
  } catch {
    return padrao; // navegação privada, dado corrompido etc.
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    return true;
  } catch {
    return false; // cota cheia ou armazenamento bloqueado
  }
}

function remover(chave) {
  try { localStorage.removeItem(PREFIXO + chave); } catch { /* ignora */ }
}

// ----- Voluntários cadastrados -----
export const listarVoluntarios = () => ler('voluntarios', []);

export const cpfJaCadastrado = (cpf) => listarVoluntarios().some((v) => v.cpf === cpf);

export function adicionarVoluntario(dados) {
  const voluntario = { ...dados, id: Date.now().toString(36), criadoEm: new Date().toISOString() };
  return salvar('voluntarios', [...listarVoluntarios(), voluntario]) ? voluntario : null;
}

export function removerVoluntario(id) {
  salvar('voluntarios', listarVoluntarios().filter((v) => v.id !== id));
}

// ----- Rascunho do formulário (salvo enquanto o usuário digita) -----
export const lerRascunho = () => ler('rascunho', null);
export const salvarRascunho = (dados) => salvar('rascunho', dados);
export const limparRascunho = () => remover('rascunho');
