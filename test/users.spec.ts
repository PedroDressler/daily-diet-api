import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

describe('Users Endpoint', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)
  })
})
