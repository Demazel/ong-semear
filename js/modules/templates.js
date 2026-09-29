// Templates: funções que recebem dados e devolvem HTML (template literals).
import { projetos, campanhas, transparencia, faq, areasInteresse, estados, IMG } from './dados.js';

// Escapa texto vindo do usuário (localStorage) antes de inserir no HTML
export const escaparHTML = (texto) => String(texto).replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const imagem = ({ arquivo, largura, altura, alt, lazy = true }) => `
  <picture>
    <source srcset="${IMG}${arquivo}.webp" type="image/webp">
    <img src="${IMG}${arquivo}.jpg" alt="${alt}" width="${largura}" height="${altura}"${lazy ? ' loading="lazy"' : ''}>
  </picture>`;

const hero = (titulo, texto, extra = '', compacto = true) => `
  <div class="hero${compacto ? ' hero--compacto' : ''}">
    <div class="container">
      <h1>${titulo}</h1>
      <p class="hero__texto">${texto}</p>
      ${extra}
    </div>
  </div>`;

// ---------- Componentes reutilizáveis ----------
export const badge = ([tipo, texto]) => `<span class="badge badge--${tipo}">${texto}</span>`;

export const cardProjeto = (p) => `
  <article class="card card--projeto col-12 col-md-6 col-lg-4">
    <figure>${imagem({ arquivo: p.imagem, largura: p.largura, altura: p.altura, alt: p.alt })}</figure>
    <div class="badges">${p.badges.map(badge).join('')}</div>
    <h3>${p.titulo}</h3>
    <p>${p.descricao}</p>
    <ul>${p.metas.map((m) => `<li>${m}</li>`).join('')}</ul>
  </article>`;

const cardCampanha = (c) => `
  <article class="card col-12 col-md-6">
    <h3>${c.titulo}</h3>
    <p>${c.descricao}</p>
    <p><label for="meta-${c.id}">${c.rotulo}</label></p>
    <progress id="meta-${c.id}" value="${c.progresso}" max="100">${c.progresso}%</progress>
  </article>`;

const campo = ({ id, rotulo, tipo = 'text', obrigatorio = true, atributos = '', dica = '', classe = '' }) => `
  <div class="campo ${classe}">
    <label for="${id}">${rotulo}${obrigatorio ? ' <span class="obrigatorio">*</span>' : ''}</label>
    <input type="${tipo}" id="${id}" name="${id}"${obrigatorio ? ' required' : ''} ${atributos}
      aria-describedby="${dica ? `${id}-dica ` : ''}${id}-erro">
    ${dica ? `<small id="${id}-dica">${dica}</small>` : ''}
    <small class="erro-campo" id="${id}-erro"></small>
  </div>`;

// ---------- Páginas ----------
export const paginaInicio = () => `
  ${hero('ONG Semear: cultivando solidariedade desde 2015',
    'Conectamos pessoas dispostas a ajudar a comunidades que precisam de apoio em educação, alimentação e cidadania.',
    '<a href="#/cadastro" class="botao">Quero ser voluntário</a>', false)}

  <section id="sobre" class="secao container" aria-labelledby="titulo-sobre">
    <h2 id="titulo-sobre">Sobre nós</h2>
    <div class="grid grid--centro">
      <figure class="col-12 col-md-6 col-lg-7">
        ${imagem({ arquivo: 'voluntarios-mutirao', largura: 800, altura: 533, alt: 'Voluntários da ONG Semear entregando cestas básicas a famílias em uma praça do bairro', lazy: false })}
        <figcaption>Mutirão de arrecadação realizado em março de 2026.</figcaption>
      </figure>
      <div class="col-12 col-md-6 col-lg-5">
        <p>A ONG Semear é uma organização sem fins lucrativos que atua em comunidades em situação de vulnerabilidade social, promovendo educação, segurança alimentar e inclusão por meio do trabalho voluntário.</p>
        <p>Desde 2015, mais de 1.200 voluntários já participaram das nossas ações, que alcançam cerca de 3.000 famílias por ano na região metropolitana de Fortaleza.</p>
      </div>
    </div>
  </section>

  <section id="missao" class="secao secao--destaque" aria-labelledby="titulo-missao">
    <div class="container">
      <h2 id="titulo-missao">Missão, visão e valores</h2>
      <div class="grid">
        <article class="card col-12 col-sm-6 col-lg-4"><h3>Missão</h3><p>Transformar realidades locais conectando pessoas dispostas a ajudar a quem mais precisa.</p></article>
        <article class="card col-12 col-sm-6 col-lg-4"><h3>Visão</h3><p>Ser referência regional em engajamento voluntário e transparência no uso de doações.</p></article>
        <article class="card col-12 col-sm-6 col-lg-4"><h3>Valores</h3><ul><li>Empatia</li><li>Transparência</li><li>Compromisso com a comunidade</li></ul></article>
      </div>
    </div>
  </section>

  <section id="como-ajudar" class="secao container" aria-labelledby="titulo-ajudar">
    <h2 id="titulo-ajudar">Como ajudar</h2>
    <ul class="lista-acoes">
      <li><a href="#/cadastro">Cadastre-se como voluntário</a></li>
      <li><a href="#/projetos">Conheça e apoie nossos projetos</a></li>
      <li>Faça uma doação pelo PIX: <strong>doe@ongsemear.org.br</strong></li>
    </ul>
  </section>

  <section id="contato" class="secao container" aria-labelledby="titulo-contato">
    <h2 id="titulo-contato">Fale conosco</h2>
    <address class="contato">
      <p><strong>Endereço:</strong> Rua das Palmeiras, 123, Centro, Fortaleza/CE, CEP 60000-000</p>
      <p><strong>Telefone:</strong> <a href="tel:+5585999990000">(85) 99999-0000</a></p>
      <p><strong>E-mail:</strong> <a href="mailto:contato@ongsemear.org.br">contato@ongsemear.org.br</a></p>
      <p><strong>Atendimento:</strong> segunda a sexta, das 8h às 17h</p>
    </address>
  </section>`;

export const paginaProjetos = () => `
  ${hero('Nossos Projetos', 'Conheça as frentes de atuação da ONG Semear e escolha a causa com a qual você mais se identifica. Você pode ajudar doando seu tempo como voluntário ou contribuindo com nossas campanhas.')}

  <section id="projetos" class="secao container" aria-labelledby="titulo-projetos">
    <h2 id="titulo-projetos">Projetos sociais em andamento</h2>
    <div class="grid">${projetos.map(cardProjeto).join('')}</div>
  </section>

  <section id="voluntariado" class="secao secao--destaque" aria-labelledby="titulo-voluntariado">
    <div class="container">
      <h2 id="titulo-voluntariado">Como ser voluntário</h2>
      <ol class="passos">
        <li>Preencha o formulário de cadastro com seus dados e sua área de interesse.</li>
        <li>Nossa equipe entra em contato em até 5 dias úteis.</li>
        <li>Participe de uma integração on-line de 1 hora.</li>
        <li>Escolha os horários e comece a transformar vidas.</li>
      </ol>
      <a href="#/cadastro" class="botao">Quero ser voluntário</a>
    </div>
  </section>

  <section id="doacoes" class="secao container" aria-labelledby="titulo-doacoes">
    <h2 id="titulo-doacoes">Campanhas de doação</h2>
    <div class="alerta alerta--aviso" role="note">
      <p><strong>Últimos dias:</strong> a Campanha do Agasalho termina em 15 de outubro.</p>
    </div>
    <div class="grid">${campanhas.map(cardCampanha).join('')}</div>
    <p><button type="button" class="botao" data-abrir-modal="modal-doacao">Doar agora</button></p>
    <h3>Formas de doar</h3>
    <ul class="lista-acoes">
      <li>PIX: <strong>doe@ongsemear.org.br</strong></li>
      <li>Transferência: Banco 000, agência 0001, conta 12345-6</li>
      <li>Doação de itens: na sede, de segunda a sexta, das 8h às 17h</li>
    </ul>

    <dialog id="modal-doacao" class="modal" aria-labelledby="titulo-modal-doacao">
      <div class="modal__conteudo">
        <button type="button" class="modal__fechar" data-fechar-modal aria-label="Fechar">&times;</button>
        <h2 id="titulo-modal-doacao">Faça sua doação via PIX</h2>
        <p>Use a chave abaixo no aplicativo do seu banco. Todo o valor vai para os projetos da ONG Semear.</p>
        <p>${badge(['meio-ambiente', 'Chave e-mail'])} <strong>doe@ongsemear.org.br</strong></p>
        <div class="alerta alerta--info" role="note">
          <p>Precisa de recibo? Envie o comprovante para contato@ongsemear.org.br.</p>
        </div>
        <div class="modal__acoes">
          <button type="button" class="botao" data-copiar="doe@ongsemear.org.br">Copiar chave PIX</button>
          <button type="button" class="botao botao--contorno" data-fechar-modal>Fechar</button>
        </div>
      </div>
    </dialog>
  </section>

  <section id="transparencia" class="secao container" aria-labelledby="titulo-transparencia">
    <h2 id="titulo-transparencia">Transparência e prestação de contas</h2>
    <div class="tabela-rolagem">
      <table>
        <caption>Arrecadação e aplicação dos recursos no 1º semestre de 2026</caption>
        <thead><tr><th scope="col">Projeto</th><th scope="col">Arrecadado</th><th scope="col">Aplicado</th></tr></thead>
        <tbody>${transparencia.map(([nome, arrecadado, aplicado]) => `
          <tr><th scope="row">${nome}</th><td>${arrecadado}</td><td>${aplicado}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section id="faq" class="secao container" aria-labelledby="titulo-faq">
    <h2 id="titulo-faq">Perguntas frequentes</h2>
    ${faq.map(([pergunta, resposta]) => `<details><summary>${pergunta}</summary><p>${resposta}</p></details>`).join('')}
  </section>`;

export const paginaCadastro = () => `
  ${hero('Seja Voluntário', 'Preencha o formulário abaixo e faça parte da rede de voluntários da ONG Semear. Entraremos em contato em até 5 dias úteis.')}

  <section class="secao container container--estreito" aria-labelledby="titulo-form">
    <h2 id="titulo-form">Formulário de cadastro</h2>
    <p class="aviso">Campos marcados com <span class="obrigatorio">*</span> são obrigatórios.</p>
    <div class="alerta alerta--info" role="note">
      <p>Seus dados ficam salvos apenas neste navegador (localStorage) e o rascunho é guardado automaticamente enquanto você digita.</p>
    </div>
    <div id="alerta-erro" class="alerta alerta--erro" role="alert" hidden>
      <p><strong>Não foi possível enviar.</strong> <span id="alerta-erro-texto">Corrija os campos destacados em vermelho.</span></p>
    </div>

    <form id="form-cadastro" class="formulario" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>
        ${campo({ id: 'nome', rotulo: 'Nome completo', atributos: 'minlength="3" maxlength="100" autocomplete="name"' })}
        ${campo({ id: 'cpf', rotulo: 'CPF', atributos: 'inputmode="numeric" maxlength="14" placeholder="000.000.000-00"', dica: 'Digite apenas os números; a formatação é automática.' })}
        ${campo({ id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date', atributos: 'autocomplete="bday"', dica: 'Idade mínima de 16 anos.' })}
      </fieldset>

      <fieldset>
        <legend>Contato</legend>
        ${campo({ id: 'email', rotulo: 'E-mail', tipo: 'email', atributos: 'maxlength="120" placeholder="seuemail@exemplo.com" autocomplete="email"' })}
        ${campo({ id: 'telefone', rotulo: 'Telefone', tipo: 'tel', atributos: 'maxlength="15" placeholder="(00) 00000-0000" autocomplete="tel"' })}
      </fieldset>

      <fieldset>
        <legend>Endereço</legend>
        ${campo({ id: 'cep', rotulo: 'CEP', atributos: 'inputmode="numeric" maxlength="9" placeholder="00000-000" autocomplete="postal-code"', dica: 'Ao informar o CEP, o endereço é preenchido automaticamente.' })}
        ${campo({ id: 'logradouro', rotulo: 'Endereço', atributos: 'maxlength="120" autocomplete="address-line1"' })}
        <div class="grid linha">
          ${campo({ id: 'numero', rotulo: 'Número', atributos: 'maxlength="10" placeholder="Ex.: 123 ou S/N"', classe: 'col-12 col-sm-4' })}
          ${campo({ id: 'complemento', rotulo: 'Complemento', obrigatorio: false, atributos: 'maxlength="60" autocomplete="address-line2"', classe: 'col-12 col-sm-8' })}
        </div>
        ${campo({ id: 'bairro', rotulo: 'Bairro', atributos: 'maxlength="60"' })}
        <div class="grid linha">
          ${campo({ id: 'cidade', rotulo: 'Cidade', atributos: 'maxlength="60" autocomplete="address-level2"', classe: 'col-12 col-sm-8' })}
          <div class="campo col-12 col-sm-4">
            <label for="estado">Estado <span class="obrigatorio">*</span></label>
            <select id="estado" name="estado" required autocomplete="address-level1" aria-describedby="estado-erro">
              <option value="">Selecione</option>
              ${estados.map(([uf, nome]) => `<option value="${uf}">${nome}</option>`).join('')}
            </select>
            <small class="erro-campo" id="estado-erro"></small>
          </div>
        </div>
      </fieldset>

      <fieldset id="grupo-interesse" aria-describedby="interesse-erro">
        <legend>Área de interesse <span class="obrigatorio">*</span></legend>
        <div class="opcoes">
          ${areasInteresse.map(([valor, texto], i) => `<label><input type="radio" name="interesse" value="${valor}"${i === 0 ? ' required' : ''}> ${texto}</label>`).join('')}
        </div>
        <small class="erro-campo" id="interesse-erro"></small>
      </fieldset>

      <fieldset>
        <legend>Termos</legend>
        <label class="opcao-termo">
          <input type="checkbox" id="termos" name="termos" required aria-describedby="termos-erro">
          Li e aceito a política de privacidade e autorizo o uso dos meus dados para fins de cadastro, conforme a LGPD. <span class="obrigatorio">*</span>
        </label>
        <small class="erro-campo" id="termos-erro"></small>
      </fieldset>

      <div class="formulario__acoes">
        <button type="submit" class="botao">Enviar cadastro</button>
        <button type="button" class="botao botao--contorno" id="limpar-rascunho">Limpar formulário</button>
      </div>
      <div id="mensagem-sucesso" class="alerta alerta--sucesso" role="status" tabindex="-1" hidden>
        <p>Cadastro enviado com sucesso! Em breve entraremos em contato.</p>
      </div>
    </form>
  </section>

  <section class="secao container container--estreito" aria-labelledby="titulo-lista">
    <h2 id="titulo-lista">Voluntários cadastrados neste navegador</h2>
    <div id="lista-voluntarios" aria-live="polite"></div>
  </section>`;

export const listaVoluntarios = (voluntarios) => {
  if (!voluntarios.length) {
    return '<p class="aviso">Nenhum cadastro salvo ainda. Envie o formulário para ver seu registro aqui.</p>';
  }
  const nomeArea = Object.fromEntries(areasInteresse);
  return `
    <ul class="lista-voluntarios">
      ${voluntarios.map((v) => `
        <li class="card">
          <div class="badges">${badge(['vagas', nomeArea[v.interesse] || v.interesse])}</div>
          <strong>${escaparHTML(v.nome)}</strong>
          <span>${escaparHTML(v.cidade)}/${escaparHTML(v.estado)} · cadastrado em ${new Date(v.criadoEm).toLocaleDateString('pt-BR')}</span>
          <button type="button" class="botao botao--pequeno botao--contorno" data-remover="${v.id}" aria-label="Remover cadastro de ${escaparHTML(v.nome)}">Remover</button>
        </li>`).join('')}
    </ul>`;
};

export const pagina404 = () => `
  ${hero('Página não encontrada', 'O endereço acessado não existe. Use o menu ou volte para a página inicial.', '<a href="#/inicio" class="botao">Ir para o início</a>')}`;
