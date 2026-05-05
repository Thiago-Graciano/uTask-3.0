import type { FastifyRequest, FastifyReply } from 'fastify';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    // tenta verificar o token JWT que vem no cabeçalho da requisição
    await (request as any).jwtVerify();
  } catch (err) {
    // se o token for inválido, expirado ou não existir, barra aqui
    return reply.status(401).send({ error: 'Token inválido ou não fornecido' });
  }
}