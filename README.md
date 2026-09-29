# ONG Semear

Plataforma web da ONG Semear, organização fictícia do terceiro setor que promove educação, segurança alimentar e inclusão por meio do voluntariado. O site divulga os projetos, recebe cadastros de voluntários e presta contas das doações.

**Site publicado:** https://demazel.github.io/ong-semear/

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Como executar localmente](#como-executar-localmente)
- [Build de produção](#build-de-produção)
- [Como testar](#como-testar)
- [Acessibilidade](#acessibilidade)
- [Fluxo de trabalho (GitFlow)](#fluxo-de-trabalho-gitflow)
- [Versões](#versões)

## Funcionalidades

- **SPA (Single Page Application)** com roteamento por hash (`#/inicio`, `#/projetos`, `#/cadastro`) e página 404
- **Templates JavaScript** gerados a partir de dados (projetos, campanhas, FAQ, transparência)
- **Formulário de voluntário** com máscaras (CPF, telefone, CEP), validação com mensagens por campo, verificação dos dígitos do CPF e preenchimento de endereço pela API ViaCEP
- **localStorage**: rascunho automático do formulário e lista de voluntários cadastrados
- **Gráfico de transparência** com Chart.js (carregado sob demanda)
- **Design responsivo** mobile-first com grid de 12 colunas e 5 breakpoints
- **Componentes**: menu hambúrguer com dropdown, modal, toast, alertas e badges
- **Modo alto contraste** com preferência salva

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (custom properties, Grid, Flexbox) |
| Comportamento | JavaScript ES6+ (ES Modules, sem framework) |
| Biblioteca | Chart.js 4.4.4 via CDN |
| API externa | ViaCEP |
| Build | Vite 6 (minificação e bundle) |
| Hospedagem | GitHub Pages via GitHub Actions |

## Estrutura de pastas

```
ong-semear/
├── index.html            # redireciona para html/index.html
├── html/
│   └── index.html        # documento único da SPA
├── css/
│   ├── variaveis.css     # design system (cores, tipografia, espaçamentos)
│   ├── base.css          # estilos globais
│   ├── layout.css        # hero, seções, rodapé e grid de 12 colunas
│   ├── componentes.css   # botões, menu, formulário, feedback
│   └── responsivo.css    # ajustes por breakpoint
├── js/
│   ├── main.js           # ponto de entrada: rotas e inicialização
│   └── modules/
│       ├── router.js     # navegação SPA
│       ├── templates.js  # geração de HTML
│       ├── dados.js      # conteúdo do site
│       ├── formulario.js # página de cadastro
│       ├── validacao.js  # regras de validação
│       ├── mascaras.js   # máscaras de digitação
│       ├── storage.js    # acesso ao localStorage
│       ├── api.js        # requisições de rede (ViaCEP)
│       ├── grafico.js    # integração com Chart.js
│       ├── menu.js       # menu hambúrguer
│       └── ui.js         # toast e modal
├── imagens/              # SVG, WebP e JPG
├── vite.config.js        # configuração do build de produção
├── package.json          # scripts dev, build e preview
└── .github/workflows/    # deploy automático no GitHub Pages
```

## Pré-requisitos

- [Git](https://git-scm.com/) para clonar o repositório
- Um navegador atualizado (Chrome, Edge, Firefox ou Safari)
- Um servidor HTTP local. Qualquer uma destas opções serve:
  - Python 3 (`python -m http.server`)
  - Node.js 18+ (`npx serve`)
  - Extensão Live Server do VS Code

Para desenvolver, o projeto **não precisa de dependências**: é HTML, CSS e JavaScript puros, e o Chart.js vem da CDN. Para gerar o build de produção é preciso o **Node.js 18+** (veja [Build de produção](#build-de-produção)).

## Como executar localmente

O projeto usa ES Modules, que não funcionam abrindo o arquivo direto (`file://`) por causa da política de CORS do navegador. Por isso é preciso um servidor local.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/Demazel/ong-semear.git
   cd ong-semear
   ```

2. Inicie um servidor (escolha um):

   ```bash
   python -m http.server 8000
   ```

   ```bash
   npx serve -l 8000
   ```

3. Acesse http://localhost:8000. A raiz redireciona para `html/index.html#/inicio`.

## Build de produção

O build usa o [Vite](https://vite.dev/), que junta e minifica os arquivos e gera a pasta `dist/`:

```bash
npm install
npm run build
npm run preview
```

O último comando serve o `dist/` em http://localhost:4173 para conferir o resultado.

| Arquivos | Código-fonte | Build | Redução |
| --- | --- | --- | --- |
| CSS (5 → 1 arquivo) | 26,9 KB | 17,8 KB | 34% |
| JavaScript (13 → 1 arquivo) | 40,5 KB | 27,9 KB | 31% |
| Total com gzip | 25,8 KB | 16,9 KB | 35% |

A publicação é automática: a cada push na `main`, o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) roda `npm ci` e `npm run build` e publica o `dist/` no GitHub Pages.

## Como testar

Roteiro de verificação manual antes de cada release:

| Área | O que conferir |
| --- | --- |
| Navegação | Menu e rodapé trocam de rota sem recarregar; o botão Voltar funciona; `#/qualquer-coisa` mostra a página 404 |
| Formulário | Enviar vazio mostra o alerta e as mensagens por campo; CPF `111.111.111-11` é recusado; CEP `01001-000` preenche o endereço |
| localStorage | Recarregar a página mantém o rascunho; o cadastro enviado aparece na lista; CPF repetido é bloqueado |
| Responsivo | 375px, 768px, 1024px e 1440px sem rolagem horizontal; menu hambúrguer abaixo de 768px |
| Acessibilidade | Navegação completa só com Tab/Shift+Tab/Enter/Esc; foco sempre visível; Lighthouse Acessibilidade ≥ 90 |

Para auditar: abra o DevTools (F12) > **Lighthouse** > marque *Accessibility* e *Performance* > **Analyze page load**.

## Acessibilidade

O projeto segue a WCAG 2.1 nível AA:

- HTML semântico (`header`, `nav`, `main`, `section`, `article`, `address`) e um único `h1` por rota
- Contraste mínimo de 4,5:1 no tema padrão e de 7:1 no modo alto contraste
- Navegação por teclado: link "Pular para o conteúdo", foco visível, dropdown com `:focus-within`, Esc fecha o menu
- Atributos ARIA: `aria-current`, `aria-expanded`, `aria-pressed`, `aria-invalid`, `aria-describedby`, `role="alert"` e `role="status"`
- Mensagens de erro com texto e ícone, sem depender só da cor
- Respeito a `prefers-reduced-motion` e `prefers-contrast`

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
| --- | --- |
| `main` | Código em produção (publicado no GitHub Pages). Recebe apenas merges de `release/*` e `hotfix/*`. |
| `develop` | Integração do desenvolvimento contínuo. |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop` e integrada com merge `--no-ff`. |
| `release/*` | Preparação de uma versão (ajustes finais, versão no CHANGELOG), integrada em `main` e `develop`. |
| `hotfix/*` | Correção urgente em produção, criada a partir de `main`. |

Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/). 
Exemplos de commits:

```text
feat(a11y): adiciona modo alto contraste com preferência salva
docs: adiciona README com funcionalidades, estrutura e fluxo GitFlow
```

As tarefas são organizadas em [issues](https://github.com/Demazel/ong-semear/issues) agrupadas no [milestone v4.0.0](https://github.com/Demazel/ong-semear/milestone/1), e cada feature entra na `develop` por [pull request](https://github.com/Demazel/ong-semear/pulls?q=is%3Apr).

## Versões

| Versão | Entrega |
| --- | --- |
| [v1.0.0](https://github.com/Demazel/ong-semear/releases/tag/v1.0.0) | Estrutura HTML5 semântica |
| [v2.0.0](https://github.com/Demazel/ong-semear/releases/tag/v2.0.0) | CSS3, design system e responsividade |
| [v3.0.0](https://github.com/Demazel/ong-semear/releases/tag/v3.0.0) | SPA em JavaScript |
| [v4.0.0](https://github.com/Demazel/ong-semear/releases/tag/v4.0.0) | Versionamento, acessibilidade, otimização e documentação |

O histórico detalhado está no [CHANGELOG](CHANGELOG.md).

## Autor

Henrique Benjamim ([@Demazel](https://github.com/Demazel))

## Licença

Projeto acadêmico desenvolvido para a experiência prática de Desenvolvimento Front-End (DreamShaper).
