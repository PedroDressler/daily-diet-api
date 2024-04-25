import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

describe('Meals Endpoints', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should create a new meal', async () => {
    const createUserResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', createUserResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)
  })
})
