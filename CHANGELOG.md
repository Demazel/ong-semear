# Changelog

Todas as mudanças relevantes do projeto. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado
- README com sumário, pré-requisitos, execução local, roteiro de testes, acessibilidade, GitFlow e versões
- Este CHANGELOG
- Modo alto contraste com preferência salva e suporte a `prefers-contrast` (#2, PR #5)
- Build de produção com Vite: CSS 34% e JS 31% menores, de 19 para 3 requisições (#4)
- Deploy automático no GitHub Pages via GitHub Actions

### Corrigido
- Ícones ⚠ e ✓ das mensagens de validação exibidos como código
- Primeiro Tab pulava o link de atalho e o menu (PR #7)
- Contraste não textual do contorno de foco e das barras do gráfico (PR #8)

## [3.0.0] - 2026-09-29

### Adicionado
- SPA com roteamento por hash e página 404
- Templates JavaScript gerados a partir de `dados.js`
- Validação com mensagens por campo e verificação dos dígitos do CPF
- Rascunho automático e lista de voluntários no localStorage
- Gráfico de transparência com Chart.js
- Código organizado em ES Modules (`js/modules/`)

### Alterado
- Estrutura de pastas: `html/`, `css/` dividido por responsabilidade, `js/modules/`
- Requisições de rede isoladas em `api.js`

## [2.0.0] - 2026-09-29

### Adicionado
- Design system com variáveis CSS (cores, tipografia e espaçamentos)
- Grid de 12 colunas e 5 breakpoints mobile-first
- Menu hambúrguer e dropdown de Projetos
- Estados de botões e feedback visual de validação
- Badges, alertas, toast e modal

### Corrigido
- Toast ficava atrás do fundo do modal

## [1.0.0] - 2026-09-29

### Adicionado
- Páginas `index.html`, `projetos.html` e `cadastro.html` com HTML5 semântico
- Formulário com validação nativa e máscaras de CPF, telefone e CEP

[Não lançado]: https://github.com/Demazel/ong-semear/compare/v3.0.0...develop
[3.0.0]: https://github.com/Demazel/ong-semear/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/Demazel/ong-semear/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/Demazel/ong-semear/releases/tag/v1.0.0
