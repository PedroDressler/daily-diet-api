import fastify from 'fastify'
import cookie from '@fastify/cookie'
import users from './routes/users'
import meals from './routes/meals'

const app = fastify()

// Plugins
app.register(cookie)

// Routes
app.register(users.handler, users.options)
app.register(meals.handler, meals.options)

export { app }
