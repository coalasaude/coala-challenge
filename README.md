# Desafio Coala - Troca de Livros por Rodrigo Barbosa Anselmo

## Descrição
Neste projeto, implementei uma aplicação de troca de livros seguindo as diretrizes fornecidas no desafio Coala. Utilizei a arquitetura limpa (Clean Architecture) no NestJS, com uma arquitetura em camadas, DTOs e princípios SOLID, incluindo o Princípio da Responsabilidade Única, Injeção de Dependência, Princípio da Segregação de Interfaces e Princípio Aberto/Fechado.

Também foram incluídas as seguintes funcionalidades e características:

- Criação de uma rota de autenticação com o Google.
- Implementação de rotas públicas e privadas para a gestão de livros e trocas.
- Utilização de migrations e chamadas ao banco de dados em PostgreSQL usando Prisma.
- Integração com a API do Google Books para buscar informações sobre livros existentes (https://www.googleapis.com/books).
- Realização de testes unitários em todas as camadas do projeto.
- Inclusão de um arquivo de seed para inicializar o banco de dados com dados. Você pode executá-lo com o comando `yarn seed`.
- Implantação do projeto usando Terraform na AWS para configurar uma instância EC2 e realizar builds. Você pode executá-lo com o comando `cd terraform`, `terraform init` e  `terraform apply`.
- Utilização do padrão de repositório, entidades, adaptadores, casos de uso (use cases), DTOs e controle da API construído como REST API.

Foram criadas as seguintes rotas no back-end:

- Login com o Google.
- Buscar usuário por token.
- Encontrar livros de um usuário.
- Encontrar lista de livros disponíveis.
- Encontrar livros disponíveis para troca.
- Adicionar livro a um usuário.
- Encontrar interesses de troca por usuário.
- Criar interesse de troca.

## URL de Deploy
Acesse a versão de produção da aplicação aqui: [URL de Deploy](https://coala-challenge-front.vercel.app)

## Como Executar o Projeto Localmente
Para executar o projeto localmente, siga os passos abaixo:

1. Clone os repositórios: Front End: `git clone https://github.com/Rodrigobanselmo/coala-challenge-front.git` e Back End: `git clone https://github.com/Rodrigobanselmo/coala-challenge-back.git`
2. Instale as dependências do projeto back-end: `cd ../coala-challenge-back && yarn install`
3. Configure as variáveis de ambiente no arquivo `.env` conforme o `.env.example`.
4. Execute o container do banco de dados: `docker-compose up -d postgres`
4.1. Execute as migrações do banco de dados: `yarn migrate`
5. Inicie o servidor back-end: `yarn dev`
6. Instale as dependências do projeto front-end: `cd ../coala-challenge-front && yarn install`
7. Inicie o servidor front-end: `yarn dev`
8. Acesse a aplicação em seu navegador: `http://localhost:3000`

## Checklist
- [x] O código segue as diretrizes e padrões de estilo do projeto.
- [x] Foi realizada uma revisão do código para identificar bugs ou problemas.
- [x] Todas as funcionalidades estão funcionando conforme o esperado.
- [x] A aplicação foi implantada em um ambiente de produção.

Boa sorte e estou à disposição para esclarecer qualquer dúvida!

WhatsApp: +5512996818163
E-mail: rodrigoanselmo.dev@gmail.com

**Mensagem Adicional:** 
Gostaria de informar que vou me casar amanhã, dia 9/9, e por isso estou entregando este desafio um pouco antesga. Agradeço pela compreensão!
