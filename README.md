# api_prisma_mysql_server
Esse projeto de exemplo visa apresentar de forma direta uma API (C.R.U.D.) em node js com o express e prisma acessando um banco de dados relacional (mysql) instalado em um container docker. 

Adicionalmente foi inseridas as linhas necessárias para se evitar o erro CORS responsável por bloquear o acesso à API através de uma app client.

referências:
node js: https://nodejs.org/en/
express: https://expressjs.com/
prisma: https://www.prisma.io/
docker: https://www.docker.com/
docker hub: https://hub.docker.com/
cors: ttps://www.npmjs.com/package/cors
sucrase: https://www.npmjs.com/package/sucrase
nodemon: https://www.npmjs.com/package/nodemon


### step-by-step node/prisma
- criar um diretório específico para o projeto

- dentro do diretório do projeto, criar o package.json:
npm init -y

- instalar prisma sucrase e o nodemon como dependência de desenvolvimento
yarn add sucrase nodemon prisma -D

- instalar o express e o cors
yarn add express cors

- alterar o package.json
 "scripts": {
    "start": "nodemon scr/server.js"
    },

- criar arquivo nodemon.json (na raíz do projeto)
source: https://dev.to/antoniel/how-to-set-up-nodemon-sucrase-31ic
{
    "execMap": {
        "js": "node -r sucrase/register"
    }
}   

- inicializar o prisma
yarn prisma init

- alterar o arquivo prisma/schema.prisma, inserindo a referência para o sqlite
fonte: https://www.prisma.io/docs/concepts/database-connectors/sqlite

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

obs.: por padrão a referência é para postgres (sorce: https://www.prisma.io/docs/concepts/database-connectors/postgresql)
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

para mysql (source: https://www.prisma.io/docs/concepts/database-connectors/mysql):
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

a instrução "yarn prisma init" cria também um arquivo .env na raiz do projeto com a url para postgres. 
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

Para mysql, alterar a url para do arquivo .env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

Para sqlite você pode "comentar" essa linha ou até mesmo excluir o arquivo .env

Para criar uma tabela, basta inserir a estrutura no próprio arquivo schema.prisma (source: https://www.prisma.io/docs/concepts/components/prisma-schema/data-model):
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  role    Role     @default(USER)
  posts   Post[]
  profile Profile?
}

- para criar realacionamento entre as tabelas (source: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/one-to-many-relations)

- para executar a primeira migration:
yarn prisma migrate dev 
o prisma irá solicitar um nome para migrate, por exemplo, create_project_tables

será gerada a o bd dev (só se estiver usando o sqlite)

- acessar o prisma studio (você pode atualizar as suas tabelas através de uma interface)
yarn prisma studio

- executar o projeto no navegador
yarn start


### step-by-step docker / mysql
- obter a imagem mysql:
docker pull mysql

- listar images
docker images

- status dos containers
docker ps / docker container ls

- rodar o container
docker run -p 3306:3306 --name mysql_prima -e MYSQL_ROOT_PASSWORD=root -d mysql
