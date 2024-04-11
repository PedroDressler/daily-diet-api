import { FastifyRequest, FastifyReply } from 'fastify'
import { database } from '../database'

export async function checkIfSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }

  const user = await database('users').where({ session_id: sessionId }).first()

  if (!user) {
    return reply.status(404).send({ error: 'User not found.' })
  }

  request.user = user
}
