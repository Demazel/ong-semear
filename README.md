# ONG Semear

Plataforma web da ONG Semear, organização fictícia do terceiro setor que promove educação, segurança alimentar e inclusão por meio do voluntariado. O site divulga os projetos, recebe cadastros de voluntários e presta contas das doações.

**Site publicado:** https://demazel.github.io/ong-semear/

## Funcionalidades

- **SPA (Single Page Application)** com roteamento por hash (`#/inicio`, `#/projetos`, `#/cadastro`) e página 404
- **Templates JavaScript** gerados a partir de dados (projetos, campanhas, FAQ, transparência)
- **Formulário de voluntário** com máscaras (CPF, telefone, CEP), validação com mensagens por campo, verificação dos dígitos do CPF e preenchimento de endereço pela API ViaCEP
- **localStorage**: rascunho automático do formulário e lista de voluntários cadastrados
- **Gráfico de transparência** com Chart.js (carregado sob demanda)
- **Design responsivo** mobile-first com grid de 12 colunas e 5 breakpoints
- **Componentes**: menu hambúrguer com dropdown, modal, toast, alertas e badges

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (custom properties, Grid, Flexbox) |
| Comportamento | JavaScript ES6+ (ES Modules, sem framework) |
| Biblioteca | Chart.js 4.4.4 via CDN |
| API externa | ViaCEP |
| Hospedagem | GitHub Pages |

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
└── imagens/              # SVG, WebP e JPG
```

## Como executar localmente

O projeto usa ES Modules, que não funcionam abrindo o arquivo direto (`file://`). É preciso um servidor local:

```bash
git clone https://github.com/Demazel/ong-semear.git
cd ong-semear
python -m http.server 8000
```

Depois acesse http://localhost:8000.

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
| --- | --- |
| `main` | Código em produção (publicado no GitHub Pages). Recebe apenas merges de `release/*` e `hotfix/*`. |
| `develop` | Integração do desenvolvimento contínuo. |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop` e integrada com merge `--no-ff`. |
| `release/*` | Preparação de uma versão (ajustes finais, versão no CHANGELOG), integrada em `main` e `develop`. |
| `hotfix/*` | Correção urgente em produção, criada a partir de `main`. |

Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`) e as versões seguem o [Versionamento Semântico](https://semver.org/lang/pt-BR/). O histórico de versões está no [CHANGELOG](CHANGELOG.md).

## Licença

Projeto acadêmico desenvolvido para a experiência prática de Desenvolvimento Front-End (DreamShaper).
