import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.CLIENT_DATABASE,
  connection:
    env.CLIENT_DATABASE === 'sqlite'
      ? {
          filename: env.CLIENT_URL,
        }
      : env.CLIENT_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const database = setupKnex(config)
