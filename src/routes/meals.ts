import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../database'
import { checkIfSessionIdExists } from '../middlewares/check-session-id-exists'
import { randomUUID } from 'crypto'

const options = { prefix: '/meals' }

async function handler(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    await checkIfSessionIdExists(request, reply)
  })

  // GET /meals
  app.get('/', async (request, reply) => {
    const id = request.user?.id

    const userMeals = await database('meals')
      .where('user_id', id)
      .select(
        'meals.id as meal_id',
        'meals.name',
        'meals.description',
        'meals.date as meal_date',
        'meals.is_on_diet',
        'meals.rating',
        'meals.created_at',
        'meals.updated_at',
      )

    return reply.status(200).send({ user: request.user?.name, userMeals })
  })

  // POST /meals
  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string().default(''),
      date: z.coerce.date(),
      isOnDiet: z.boolean().default(false),
      rating: z.number().optional(),
    })

    const { name, date, description, isOnDiet, rating } =
      createMealBodySchema.parse(request.body)

    const mealPostResponse = await database('meals').insert({
      id: randomUUID(),
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getTime(),
      user_id: request.user?.id,
      rating,
    })

    return reply
      .status(201)
      .send({ message: 'Meal created', responseCode: mealPostResponse })
  })

  // DELETE /meals/:mealId
  app.delete('/:mealId', async (request, reply) => {
    const paramsSchema = z.object({
      mealId: z.string().uuid(),
    })

    const { mealId } = paramsSchema.parse(request.params)

    const meal = await database('meals').where({ id: mealId })

    if (!meal) {
      return reply.status(404).send({ message: 'Meal not found!' })
    }

    await database('meals').where({ id: mealId }).del()

    return reply.status(204).send({ message: 'Meal deleted successfully' })
  })

  // PUT /meals/:mealId
  app.put('/:mealId', async (request, reply) => {
    const updateMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      isOnDiet: z.boolean(),
      rating: z.number(),
    })

    const { name, description, date, isOnDiet, rating } =
      updateMealBodySchema.parse(request.body)

    const paramsSchema = z.object({
      mealId: z.string().uuid(),
    })

    const { mealId } = paramsSchema.parse(request.params)

    const userId = request.user?.id

    const meal = await database('meals')
      .where({
        user_id: userId,
        id: mealId,
      })
      .first()

    if (!meal) {
      return reply.status(404).send({ message: 'Meal not found' })
    }

    await database('meals').where({ id: mealId, user_id: userId }).update({
      name,
      description,
      date: date.getTime(),
      is_on_diet: isOnDiet,
      rating,
    })

    return reply.status(204).send()
  })
}

export default { handler, options }
