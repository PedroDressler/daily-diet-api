import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'

const indexRoute = async (fastify: FastifyInstance) => {
  const files = readdirSync(resolve(__dirname)).filter(
    (file) => !file.startsWith('index') && file.endsWith('.ts'),
  )

  const createRouteParametersSchema = z.object({
    handler: z.function(),
    prefix: z.string(),
  })

  for (const file of files) {
    const url = `./${file}`
    const routeModule = await import(url)

    const { handler, prefix } = createRouteParametersSchema.parse(
      routeModule.default,
    )
    fastify.register(handler, prefix)
  }
}

export default indexRoute
