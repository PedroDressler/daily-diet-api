import fastify from 'fastify'
import { usersRoutes } from './routes/user'
import { mealsRoutes } from './routes/meals'

export const app = fastify()

// Routes
app.register(usersRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })
