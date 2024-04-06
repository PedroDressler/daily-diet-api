import fastify from 'fastify'
import { usersRoutes } from './routes/user'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'

export const app = fastify()

// Plugins
app.register(cookie)

// Routes
app.register(usersRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })
