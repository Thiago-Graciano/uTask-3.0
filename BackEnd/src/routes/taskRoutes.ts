import type { FastifyInstance } from 'fastify';
import { TaskController } from '../controllers/TaskController.js';
import { authMiddleware } from '../middlewares/auth.js';
import { QuoteController } from '../controllers/QuoteController.js';

export async function taskRoutes(app: FastifyInstance) {
    const taskController = new TaskController();
    const quoteController = new QuoteController();

    app.addHook('preHandler', authMiddleware);

    app.get('/quote', (req, rep) => quoteController.getQuote(req, rep));

    app.get('/tasks', (req, rep) => taskController.list(req, rep));
    app.post('/tasks', (req, rep) => taskController.create(req, rep));
    app.patch('/tasks/:id', (req, rep) => taskController.updateStatus(req, rep));
    app.delete('/tasks/:id', (req, rep) => taskController.delete(req, rep));
}