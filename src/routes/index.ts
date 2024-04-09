import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { FastifyInstance } from 'fastify'

const indexRoute = async (fastify: FastifyInstance) => {
  const files = readdirSync(resolve(__dirname)).filter(
    (file) => !file.startsWith('index') && file.endsWith('.ts'),
  )

  for (const file of files) {
    const routeModule = await import(resolve(__dirname, file))
    const { routes, prefix } = routeModule
    fastify.register(routes, prefix)
  }
}

export default indexRoute
