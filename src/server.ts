import { app } from './app'

app.listen({ port: 3333, host: 'localhost' }).then(() => {
  console.log('HTTP Server Running')
})
