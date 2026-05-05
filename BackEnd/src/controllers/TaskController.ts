import type { FastifyRequest, FastifyReply } from 'fastify';
import { AppDataSource } from '../data-source.js';
import { Task } from '../entities/Task.js';
import { User } from '../entities/User.js';

export class TaskController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as any;
    
    // O request.user do token que o middleware validou
    const userData = (request as any).user as { id: string };

    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    // Busca o usuário dono da tarefa
    const user = await userRepository.findOneBy({ id: userData.id });

    if (!user) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    // Cria a nova tarefa vinculada ao usuário
    const newTask = taskRepository.create({
      title,
      description,
      status: 'todo',
      user: user
    });

    await taskRepository.save(newTask);

    return reply.status(201).send(newTask);
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const userData = (request as any).user as { id: string };
    const taskRepository = AppDataSource.getRepository(Task);

    // Lista apenas as tarefas que pertencem ao ID do usuário logado
    const tasks = await taskRepository.find({
      where: { user: { id: userData.id } }
    });

    return reply.send(tasks);
  }

async updateStatus(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };
    const taskRepository = AppDataSource.getRepository(Task);

    await taskRepository.update(id, { status });
    return reply.send({ message: "Status atualizado!" });
}

async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const taskRepository = AppDataSource.getRepository(Task);

    await taskRepository.delete(id);
    return reply.status(204).send();
}

}