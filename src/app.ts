import fastify from 'fastify'
// import usersRoutes from './routes/user'
// import mealsRoutes from './routes/meals'
import cookie from '@fastify/cookie'
import indexRoute from './routes'

export const app = fastify()

// Plugins
app.register(cookie)

// Routes
indexRoute(app)
