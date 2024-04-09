import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { database } from '../database'
import { checkIfSessionIdExists } from '../middlewares/check-session-id-exists'
import { randomUUID } from 'crypto'

async function mealsRoutes(app: FastifyInstance) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    isOnDiet: z.boolean().default(false),
    rating: z.number().optional(),
  })

  // POST /meals
  app.post(
    '/',
    { preHandler: [checkIfSessionIdExists] },
    async (request, reply) => {
      const { name, description, isOnDiet, rating } =
        createMealBodySchema.parse(request.body)

      const mealPostResponse = await database('meals').insert({
        id: randomUUID(),
        name,
        description,
        is_on_diet: isOnDiet,
        // date: date.getTime(),
        user_id: request.user?.id,
        rating,
      })

      return reply.status(201).send({ mealPostResponse })
    },
  )
}

export default { mealsRoutes, prefix: '/meals' }
