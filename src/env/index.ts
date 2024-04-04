import { config } from 'dotenv'
import { z as zod } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}
const envSchema = zod.object({
  NODE_ENV: zod
    .enum(['development', 'test', 'production'])
    .default('production'),
  CLIENT_DATABASE: zod.enum(['pg', 'sqlite']),
  CLIENT_URL: zod.string(),
  PORT: zod.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error('[Diet API]: Invalid enviromnent variables.')
}

export const env = _env.data
