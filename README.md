# BextTesteBackend

## 1. Visão Geral do Sistema

### Fluxo Padrão da Arquitetura Backend

Neste diagrama, detalhamos como as requisições transitam entre as camadas da API, desde a entrada no servidor até a resposta final, seguindo princípios de Clean Architecture.

![Diagrama mostrando o fluxo de uma requisição pelas camadas do backend (Rotas, Controllers, Use Cases, Repositories)](./public/fluxo-padrao-backend.png)

## 2. Organização do Projeto

### Estrutura de Pastas e Arquivos

Esta imagem ilustra a organização modular do código-fonte dentro do diretório `src/`, destacando a separação de responsabilidades.

![Visão hierárquica das pastas do projeto: server.ts, router, controller, use_case, domain (model, schema), types e documentation](./public/estrutura-de-pastas.png)

## 3. Fluxos de Negócio e Casos de Uso

### Fluxo de Autenticação do Usuário

Diagrama detalhado do processo de login e registro, incluindo a geração de tokens e validações de segurança.

![Fluxograma mostrando o passo a passo da autenticação de um usuário no sistema](./public/fluxo-usuario.png)

### Fluxo de Domínio: Gestão de Tarefas

Este diagrama representa a lógica de negócio principal para a criação, atualização e listagem de tarefas dentro do domínio da aplicação.

![Representação visual das regras de negócio aplicadas ao domínio de tarefas, mostrando a interação entre modelos, schemas e use cases](./public/fluxo-tarefa-domain.png)

### Fluxo de Commit

git init
git add .
git commit -m "✨ feat:"
git push -u origin producao
