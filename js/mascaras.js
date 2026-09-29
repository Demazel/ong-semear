'use strict';

// Aplica uma máscara ao campo: remove tudo que não é número e formata o restante
function aplicarMascara(id, formatar) {
  const campo = document.getElementById(id);
  if (!campo) return;
  campo.addEventListener('input', () => {
    campo.value = formatar(campo.value.replace(/\D/g, ''));
  });
}

// 000.000.000-00
aplicarMascara('cpf', (v) => v.slice(0, 11)
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2'));

// (00) 00000-0000 ou (00) 0000-0000
aplicarMascara('telefone', (v) => v.slice(0, 11)
  .replace(/^(\d{2})(\d)/, '($1) $2')
  .replace(/(\d)(\d{4})$/, '$1-$2'));

// 00000-000
aplicarMascara('cep', (v) => v.slice(0, 8)
  .replace(/(\d{5})(\d)/, '$1-$2'));

// Preenche o endereço a partir do CEP usando a API pública ViaCEP
const campoCep = document.getElementById('cep');
if (campoCep) {
  campoCep.addEventListener('blur', async () => {
    const cep = campoCep.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();
      if (dados.erro) return;
      document.getElementById('logradouro').value = dados.logradouro || '';
      document.getElementById('bairro').value = dados.bairro || '';
      document.getElementById('cidade').value = dados.localidade || '';
      document.getElementById('estado').value = dados.uf || '';
      document.getElementById('numero').focus();
    } catch {
      // Sem conexão: o usuário preenche o endereço manualmente
    }
  });
}

// O evento submit só dispara quando todas as validações nativas passam
const formulario = document.getElementById('form-cadastro');
const mensagem = document.getElementById('mensagem-sucesso');
if (formulario && mensagem) {
  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    formulario.reset();
    mensagem.hidden = false;
    mensagem.focus();
  });
}
