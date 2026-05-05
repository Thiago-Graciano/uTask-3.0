import type { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController.js';

export async function authRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post('/register', userController.register);
  app.post('/login', userController.login);
}