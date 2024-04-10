import fastify from 'fastify'
import { env } from './env'
import cookie from '@fastify/cookie'
import { indexRoute } from './routes'

export const app = fastify()

// Plugins
app.register(cookie)

export async function startServer() {
  await indexRoute(app)
  await app.listen({ port: env.PORT, host: 'localhost' }).then(() => {
    console.log('HTTP Server Running')
  })
}

try {
  startServer()
} catch (err) {
  app.log.error(err)

  process.exit(1)
}
