import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

type JwtPayload = { id: string; email: string };

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: 'Token inválido ou não fornecido' });
    }

    const [, token] = authHeader.split(' ');
    if (!token) {
      return reply.status(401).send({ error: 'Token inválido ou não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as JwtPayload;
    (request as any).user = { id: decoded.id, email: decoded.email };
  } catch {
    return reply.status(401).send({ error: 'Token inválido ou não fornecido' });
  }
}