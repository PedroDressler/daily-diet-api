import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'

export const indexRoute = async (app: FastifyInstance) => {
  const files = readdirSync(resolve(__dirname)).filter(
    (file) => !file.startsWith('index') && file.endsWith('.ts'),
  )

  const createRouteParametersSchema = z.object({
    handler: z.function(),
    options: z.object({
      prefix: z.string(),
    }),
  })

  for (const file of files) {
    const url = `./${file}`
    const routeModule = await import(url)

    const { handler, options } = createRouteParametersSchema.parse(
      routeModule.default,
    )

    app.register(handler, options)
  }
}
