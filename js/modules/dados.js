// Conteúdo do site separado da marcação: os templates apenas leem estes dados.
// Caminhos de imagem são relativos a html/index.html.
const IMG = '../imagens/';

export const projetos = [
  {
    id: 'horta',
    titulo: 'Horta Comunitária',
    descricao: 'Transforma terrenos ociosos em hortas que abastecem famílias e ensinam técnicas de cultivo sustentável.',
    imagem: 'projeto-horta',
    largura: 800,
    altura: 600,
    alt: 'Voluntários plantando mudas de hortaliças em canteiros de uma horta comunitária',
    badges: [['meio-ambiente', 'Meio ambiente'], ['vagas', 'Vagas abertas']],
    metas: ['Meta 2026: 5 hortas ativas', '120 famílias atendidas'],
  },
  {
    id: 'reforco',
    titulo: 'Reforço Escolar',
    descricao: 'Aulas gratuitas de português e matemática para crianças do ensino fundamental, no contraturno escolar.',
    imagem: 'projeto-reforco-escolar',
    largura: 800,
    altura: 600,
    alt: 'Voluntária ajudando crianças com a lição de casa em uma sala de aula',
    badges: [['educacao', 'Educação'], ['vagas', 'Vagas abertas']],
    metas: ['Meta 2026: 200 alunos', 'Aulas de segunda a quinta'],
  },
  {
    id: 'cesta',
    titulo: 'Cesta Solidária',
    descricao: 'Arrecadação e distribuição mensal de cestas básicas para famílias em situação de insegurança alimentar.',
    imagem: 'projeto-cesta-solidaria',
    largura: 800,
    altura: 600,
    alt: 'Caixas de doação cheias de alimentos não perecíveis organizadas sobre uma mesa',
    badges: [['alimentacao', 'Alimentação'], ['urgente', 'Urgente']],
    metas: ['Meta 2026: 6.000 cestas', 'Distribuição todo primeiro sábado do mês'],
  },
];

export const campanhas = [
  { id: 'agasalho', titulo: 'Campanha do Agasalho', descricao: 'Arrecadação de roupas e cobertores para o período de chuvas.', progresso: 63, rotulo: 'Arrecadado: 630 de 1.000 peças' },
  { id: 'material', titulo: 'Material Escolar 2027', descricao: 'Kits escolares para os alunos do projeto Reforço Escolar.', progresso: 35, rotulo: 'Arrecadado: R$ 4.200 de R$ 12.000' },
];

export const transparencia = [
  ['Horta Comunitária', 'R$ 18.500', 'R$ 17.900'],
  ['Reforço Escolar', 'R$ 24.000', 'R$ 23.100'],
  ['Cesta Solidária', 'R$ 62.300', 'R$ 61.800'],
];

export const faq = [
  ['Preciso ter experiência para ser voluntário?', 'Não. Oferecemos uma integração inicial e acompanhamento durante as atividades.'],
  ['Qual a idade mínima para participar?', 'A partir de 16 anos. Menores de 18 anos precisam de autorização dos responsáveis.'],
  ['Posso escolher os dias em que vou ajudar?', 'Sim. Você informa sua disponibilidade e montamos a escala de acordo com ela.'],
];

export const areasInteresse = [
  ['horta', 'Horta Comunitária'],
  ['reforco', 'Reforço Escolar'],
  ['cesta', 'Cesta Solidária'],
  ['eventos', 'Eventos e campanhas'],
];

export const estados = [
  ['AC', 'Acre'], ['AL', 'Alagoas'], ['AP', 'Amapá'], ['AM', 'Amazonas'], ['BA', 'Bahia'],
  ['CE', 'Ceará'], ['DF', 'Distrito Federal'], ['ES', 'Espírito Santo'], ['GO', 'Goiás'],
  ['MA', 'Maranhão'], ['MT', 'Mato Grosso'], ['MS', 'Mato Grosso do Sul'], ['MG', 'Minas Gerais'],
  ['PA', 'Pará'], ['PB', 'Paraíba'], ['PR', 'Paraná'], ['PE', 'Pernambuco'], ['PI', 'Piauí'],
  ['RJ', 'Rio de Janeiro'], ['RN', 'Rio Grande do Norte'], ['RS', 'Rio Grande do Sul'],
  ['RO', 'Rondônia'], ['RR', 'Roraima'], ['SC', 'Santa Catarina'], ['SP', 'São Paulo'],
  ['SE', 'Sergipe'], ['TO', 'Tocantins'],
];

export { IMG };
