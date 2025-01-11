## Sistema de Gerenciamento de Produtos.

Este projeto web possui uma única página principal aonde é possível o usuário criar seus produtos e os mesmos serem exibidos na tabela, ficando disponível para a edição/exclusão.

#### Tecnologias usadas:
- Frontend: NextJS, TailwindCSS, PrimeReact, Zod, Hook Form, ReactQuery.
- Bakend: NestJS e Prisma.
- Banco PostgreSQL.

<img src="./frontend/src/assets/gerenciamento_produtos.png" alt="Imagem do Projeto" width="80%" style="border-radius: 20px; margin-top: 16px;">

### 🖥️ Instalação

1. Clone este repositório
```bash
git clone https://github.com/matheusmatosr/gerenciamento_de_produtos.git
```

#### Backend

Abra o terminal e faça os seguintes comandos:

2. Para acessar a pasta

```bash
cd backend
```

3. Para instalar as dependências

```bash
npm install
```

4. Para adicionar o arquivo **.env** no raíz da projeto, ou seja, dentro da pasta do ./backend e adicione no arquivo a url do seu banco PostgreSQL:

```bash
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DB_NAME?schema=public
```

5. Para rodar o backend:

```bash
npm run start
```

#### Frontend

Abra um novo terminal e faça os seguintes comandos:

2. Para acessar a pasta

```bash
cd frontend
```

3. Para instalar as dependências

```bash
npm install
```

4. Para adicionar o arquivo **.env** no raíz da projeto, ou seja, dentro da pasta do ./frontend e adicione no arquivo a url da API do backend:

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000/produtos"
```

5. Para rodar o projeto:

```bash
npm run dev
```

Acesse o projeto no navegador pelo link gerado no terminal (geralmente http://localhost:3001).
