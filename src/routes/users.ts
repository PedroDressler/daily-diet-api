import { FastifyInstance } from 'fastify'
import { database } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkIfSessionIdExists } from '../middlewares/check-session-id-exists'

const options = { prefix: 'users' }

async function handler(app: FastifyInstance) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  // GET /user
  app.get(
    '/',
    { preHandler: [checkIfSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies

      const user = await database('users')
        .where('session_id', sessionId)
        .select()

      return reply.status(200).send({ user })
    },
  )

  // POST /user
  app.post('/', async (request, reply) => {
    const { name, email } = createUserBodySchema.parse(request.body)

    const userByEmail = await database('users').where({ email }).first()

    if (userByEmail) {
      return reply.status(400).send({ message: 'User already exists!' })
    }

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await database('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}

export default { handler, options }
