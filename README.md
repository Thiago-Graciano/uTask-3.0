# uTask 3.0
**Status:** 🚧 Em desenvolvimento

---

## 📌 Sobre o projeto

O uTask 3.0 é uma aplicação web de gerenciamento de tarefas inspirada no Trello. O objetivo é permitir que usuários criem, organizem e acompanhem suas tarefas através de um board Kanban com as colunas **To Do**, **Doing** e **Done**.

Este projeto está sendo desenvolvido como parte do processo trainee da **UNECT Jr**, empresa júnior de tecnologia da UTFPR Campus Cornélio Procópio.

---

## 🚀 Tecnologias

### Frontend
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)

### Backend
- [Fastify](https://fastify.dev/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (@fastify/jwt)](https://github.com/fastify/fastify-jwt)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [TypeScript](https://www.typescriptlang.org/)

---

## ✅ Funcionalidades

### Autenticação
- [x] Cadastro de usuário com senha criptografada (bcrypt)
- [x] Login com geração de token JWT (válido por 7 dias)
- [x] Middleware de autenticação protegendo rotas privadas

### Tarefas
- [x] Criar tarefa vinculada ao usuário logado
- [x] Listar tarefas do usuário autenticado
- [x] Atualizar status da tarefa (todo → doing → done)
- [x] Deletar tarefa
- [x] Frase motivacional do dia

### Interface
- [x] Tela de login
- [x] Tela de cadastro
- [x] Tema claro e escuro
- [ ] Board Kanban (em desenvolvimento)

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL instalado e rodando

### 1. Clone o repositório

```bash
git clone https://github.com/Thiago-Graciano/uTask-3.0.git
cd uTask-3.0
```

### 2. Configure o Backend

```bash
cd BackEnd
npm install
```

Crie um arquivo `.env` na pasta `BackEnd/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=utask_db
```

Rode o servidor:

```bash
npm run dev
```

### 3. Configure o Frontend

```bash
cd FrontEnd
npm install
npm run dev
```

---

## 👨‍💻 Autor

Feito por **Thiago Graciano** — Trainee na [UNECT Jr](https://github.com/unect-jr)
