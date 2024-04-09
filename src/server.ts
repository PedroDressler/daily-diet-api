import { app } from './app'
import { env } from './env'

try {
  app.listen({ port: env.PORT, host: 'localhost' }).then(() => {
    console.log('HTTP Server Running')
  })
} catch (err) {
  app.log.error(err)

  process.exit(1)
}
