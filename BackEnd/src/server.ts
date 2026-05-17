import "reflect-metadata";
import Fastify from 'fastify';
import { AppDataSource } from './data-source.js';
import { authRoutes } from './routes/authRoutes.js';
import { taskRoutes } from './routes/taskRoutes.js';

const app = Fastify({ logger: true });

app.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

if (request.method === 'OPTIONS') {
    return reply.status(204).send();
  }
  });

app.register(authRoutes);
app.register(taskRoutes);

const start = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Banco de Dados conectado!');

    await app.listen({ port: 3333, host: '0.0.0.0' }); 
    console.log('🚀 Servidor rodando em http://localhost:3333');
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
};

start();