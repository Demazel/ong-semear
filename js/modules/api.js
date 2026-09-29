// Comunicação com serviços externos. Nenhum outro módulo faz requisições de rede.
const VIACEP = 'https://viacep.com.br/ws';

// Consulta o endereço de um CEP. Devolve { logradouro, bairro, cidade, estado } ou null.
export async function consultarCep(cep) {
  const numeros = cep.replace(/\D/g, '');
  if (numeros.length !== 8) return null;
  const resposta = await fetch(`${VIACEP}/${numeros}/json/`);
  if (!resposta.ok) throw new Error(`ViaCEP respondeu ${resposta.status}`);
  const dados = await resposta.json();
  if (dados.erro) return null;
  return { logradouro: dados.logradouro, bairro: dados.bairro, cidade: dados.localidade, estado: dados.uf };
}
