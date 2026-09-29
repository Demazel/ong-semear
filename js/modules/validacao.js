// Regras de validação: cada função recebe o valor e devolve '' (ok) ou a mensagem de erro.
const soNumeros = (v) => v.replace(/\D/g, '');

export function cpfValido(cpf) {
  const n = soNumeros(cpf);
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false;
  // Calcula os dois dígitos verificadores
  const digito = (base) => {
    const soma = [...base].reduce((total, d, i) => total + Number(d) * (base.length + 1 - i), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(n.slice(0, 9)) === Number(n[9]) && digito(n.slice(0, 10)) === Number(n[10]);
}

function idade(dataISO) {
  const nasc = new Date(`${dataISO}T00:00:00`);
  const hoje = new Date();
  let anos = hoje.getFullYear() - nasc.getFullYear();
  const aindaNaoFezAniversario = hoje.getMonth() < nasc.getMonth()
    || (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate());
  if (aindaNaoFezAniversario) anos -= 1;
  return anos;
}

const obrigatorio = (msg) => (v) => (v.trim() ? '' : msg);

export const regras = {
  nome: (v) => {
    if (!v.trim()) return 'Informe seu nome completo.';
    if (!/^[A-Za-zÀ-ÿ']+( [A-Za-zÀ-ÿ']+)+$/.test(v.trim())) return 'Informe nome e sobrenome, apenas com letras.';
    return '';
  },
  cpf: (v) => {
    if (!v) return 'Informe seu CPF.';
    if (soNumeros(v).length !== 11) return 'O CPF deve ter 11 dígitos.';
    return cpfValido(v) ? '' : 'CPF inválido. Confira os números digitados.';
  },
  nascimento: (v) => {
    if (!v) return 'Informe sua data de nascimento.';
    const anos = idade(v);
    if (Number.isNaN(anos) || anos > 110) return 'Data de nascimento inválida.';
    return anos < 16 ? 'É preciso ter no mínimo 16 anos para ser voluntário.' : '';
  },
  email: (v) => {
    if (!v) return 'Informe seu e-mail.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'E-mail inválido. Exemplo: nome@exemplo.com';
  },
  telefone: (v) => {
    const n = soNumeros(v);
    if (!n) return 'Informe seu telefone.';
    return /^[1-9]{2}9?\d{8}$/.test(n) ? '' : 'Telefone inválido. Use DDD + número.';
  },
  cep: (v) => {
    if (!v) return 'Informe seu CEP.';
    return soNumeros(v).length === 8 ? '' : 'O CEP deve ter 8 dígitos.';
  },
  logradouro: obrigatorio('Informe o endereço.'),
  numero: obrigatorio('Informe o número ou S/N.'),
  bairro: obrigatorio('Informe o bairro.'),
  cidade: obrigatorio('Informe a cidade.'),
  estado: obrigatorio('Selecione o estado.'),
};

// Aplica o resultado de uma regra no DOM: mensagem, classes e ARIA
export function marcarCampo(elemento, mensagem, containerSeletor = '.campo') {
  const container = elemento.closest(containerSeletor);
  const erro = document.getElementById(`${elemento.name || elemento.id}-erro`);
  container?.classList.toggle('campo--erro', Boolean(mensagem));
  container?.classList.toggle('campo--ok', !mensagem && elemento.required);
  elemento.setAttribute('aria-invalid', String(Boolean(mensagem)));
  if (erro) erro.textContent = mensagem;
}

export function validarCampo(form, nome) {
  if (nome === 'interesse') {
    const marcado = form.querySelector('input[name="interesse"]:checked');
    const msg = marcado ? '' : 'Escolha uma área de interesse.';
    marcarCampo(form.querySelector('input[name="interesse"]'), msg, 'fieldset');
    return msg;
  }
  if (nome === 'termos') {
    const msg = form.termos.checked ? '' : 'É necessário aceitar os termos para continuar.';
    marcarCampo(form.termos, msg, 'fieldset');
    return msg;
  }
  const regra = regras[nome];
  if (!regra) return '';
  const msg = regra(form.elements[nome].value);
  marcarCampo(form.elements[nome], msg);
  return msg;
}

// Valida tudo e devolve a lista de campos com erro (na ordem do formulário)
export function validarFormulario(form) {
  return [...Object.keys(regras), 'interesse', 'termos'].filter((nome) => validarCampo(form, nome));
}
