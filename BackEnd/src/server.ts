import "reflect-metadata";
import Fastify from 'fastify';
import { AppDataSource } from './data-source.js';
import { authRoutes } from './routes/authRoutes.js';
import { taskRoutes } from './routes/taskRoutes.js';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';


const app = Fastify({ logger: true });

app.register(cors, { 
  origin: true
});

// 2. Depois configuramos o JWT
app.register(jwt, {
  secret: 'super-senha-secreta-do-unect-2026' 
});

// 3. Depois registramos as rotas
app.register(authRoutes);
app.register(taskRoutes);

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Banco de Dados conectado!");

    await app.listen({ port: 3333, host: '0.0.0.0' }); 
    console.log('🚀 Servidor rodando em http://localhost:3333');
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

start();