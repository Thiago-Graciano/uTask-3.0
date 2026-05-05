import type { FastifyRequest, FastifyReply } from 'fastify';
import { AppDataSource } from '../data-source.js';
import { User } from '../entities/User.js';
import bcrypt from 'bcrypt';

export class UserController {

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;
    const userRepository = AppDataSource.getRepository(User);

    // 1. Procura o usuário pelo email
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return reply.status(401).send({ error: "E-mail ou senha inválidos." });
    }

    // 2. Compara a senha digitada com a senha criptografada no banco
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send({ error: "E-mail ou senha inválidos." });
    }

    const token = (request.server as any).jwt.sign({
      id: user.id,
      email: user.email
    }, {
      expiresIn: '7d' // Token válido por 7 dias
    });

    // Retorna a mensagem, o TOKEN e os dados básicos
    return reply.send({
      message: "Login realizado com sucesso!",
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = request.body as any;
      const userRepository = AppDataSource.getRepository(User);

      const userExists = await userRepository.findOneBy({ email });
      if (userExists) {
        return reply.status(400).send({ error: "Já existe uma conta com esse email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      return reply.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      return reply.status(500).send({ error: "Erro interno no servidor" });
    }
  }
}