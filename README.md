# Teste Frontend AppMasters

Teste frontend para App Masters,

Precisamos implementar o frontend para apresentar uma lista de jogos, que será fornecida por uma API.

Porém, essa API é estranha… não tem documentação, dá uns erros, ora responde, ora falha, pede um `header`👀 lá... mas, temos certeza que você conseguirá ainda assim fazer um projeto incrível!

## Deploy

Para acessar esse projeto em produção acesse:

  📍 <a href="" target="_blank" ></a>
# Layout
## 🗒️ Lista de Games
[<img src="./public/success.png"/>]()
## 🪹 Empty List
[<img src="./public/empty.png"/>]()

## 🔋 Loading
[<img src="./public/loading.png"/>]()

## ❌ Server Error
[<img src="./public/serverError.png"/>]()

## ❌ Error
[<img src="./public/error.png"/>]()

## Requisitos

- ✅ O projeto deve ser feito usando React ou Next.JS

- ✅ Obter a lista de jogos em `/data`

- ✅ Apresentar um loader enquanto os dados são obtidos

- ✅ Apresentar os jogos em três colunas (no computador)

- ✅ Em cada card apresentar o título e imagem pelo ao menos

- ✅ Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular

- ✅ Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`

- ✅ Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`

- ✅ Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`

- ✅ Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader

- ✅ Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive

- ✅ Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado

## Tecnologias utilizadas

- Nextjs
- React
- Typescript
- Javascript
- Styled-Components
- React Query
- Axios
- Axios Mock Adapter

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env.local

`DEV_EMAIL=<email>`

## Rodando Localmente

```bash
$ git clone https://github.com/zkauansantos/test-appMasters.git

$ cd test-appMasters

$ npm install ou yarn install

$ npm run dev ou yarn dev
```
