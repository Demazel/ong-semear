// Máscaras de digitação: removem o que não é número e formatam o restante.
export const formatadores = {
  // 000.000.000-00
  cpf: (v) => v.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
  // (00) 00000-0000 ou (00) 0000-0000
  telefone: (v) => v.slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2'),
  // 00000-000
  cep: (v) => v.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),
};

export function aplicarMascaras(form) {
  Object.entries(formatadores).forEach(([nome, formatar]) => {
    const campo = form.elements[nome];
    if (!campo) return;
    campo.addEventListener('input', () => {
      campo.value = formatar(campo.value.replace(/\D/g, ''));
    });
  });
}
