import type { FastifyRequest, FastifyReply } from 'fastify';
import { AppDataSource } from '../data-source.js';
import { Task } from '../entities/Task.js';
import { User } from '../entities/User.js';

export class TaskController {

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, order } = request.body as any;
    const userData = (request as any).user as { id: string };
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userData.id });
    if (!user) return reply.status(404).send({ error: "Usuário não encontrado" });
    const newTask = taskRepository.create({
      title, description, status: 'todo',
      order: order ?? 0,
      user
    });
    await taskRepository.save(newTask);
    return reply.status(201).send(newTask);
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const userData = (request as any).user as { id: string };
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({
      where: { user: { id: userData.id } },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
    return reply.send(tasks);
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { status, title, description, order } = request.body as any;
  const userData = (request as any).user as { id: string };

  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOne({
    where: {
      id,
      user: {
        id: userData.id,
      },
    },
  });

  if (!task) {
    return reply.status(404).send({ error: "Task não encontrada" });
  }

  if (status !== undefined) task.status = status;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (order !== undefined) task.order = order;

  await taskRepository.save(task);

  return reply.send({ message: "Task atualizada!" });
}

  async reorder(request: FastifyRequest, reply: FastifyReply) {
  const { tasks } = request.body as {
    tasks: Array<{ id: string; status: string; order: number }>;
  };

  const userData = (request as any).user as { id: string };
  const taskRepository = AppDataSource.getRepository(Task);

  for (const taskData of tasks) {
    const task = await taskRepository.findOne({
      where: {
        id: taskData.id,
        user: {
          id: userData.id,
        },
      },
    });

    if (!task) {
      return reply.status(404).send({ error: "Task não encontrada" });
    }

    task.status = taskData.status;
    task.order = taskData.order;

    await taskRepository.save(task);
  }

  return reply.send({ message: "Tasks reordenadas!" });
}

  async delete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const userData = (request as any).user as { id: string };

  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOne({
    where: {
      id,
      user: {
        id: userData.id,
      },
    },
  });

  if (!task) {
    return reply.status(404).send({ error: "Task não encontrada" });
  }

  await taskRepository.delete(task.id);

  return reply.status(204).send();
}
}