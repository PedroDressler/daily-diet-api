import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
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
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)
  })

  it("should be able to edit a meal's data", async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)

    const mealId = mealResponse.body.userMeals[0].meal_id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(204)
  })

  it('should be able to delete a meal', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)

    const mealId = mealResponse.body.userMeals[0].meal_id

    await request(app.server)
      .del(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(204)
  })

  it("should be able to list all user's meals", async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Feijoada',
        description:
          'Arroz, feijão preto, linguiça calabresa, pele de porco, farofa, couve',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)
  })

  it('should be able to show a single meal', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    const mealResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)

    const mealId = mealResponse.body.userMeals[0].meal_id

    await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)
  })

  it("should be able to list user's metrics", async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Pedro',
        email: 'pedro@email.com',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Strogonoff',
        description: 'Arroz, frango com molho e batata palha',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .send({
        name: 'Feijoada',
        description:
          'Arroz, feijão preto, linguiça calabresa, pele de porco, farofa, couve',
        rating: 5,
        isOnDiet: false,
        date: '2024-04-23T12:12:00',
      })
      .expect(201)

    const metricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', userResponse.get('Set-Cookie')!)
      .expect(200)

    expect(metricsResponse.body).toEqual(
      expect.objectContaining({
        totalMeals: expect.any(Number),
        totalMealsOnDiet: expect.any(Number),
        totalMealsOffDiet: expect.any(Number),
        dietStreak: expect.any(Number),
      }),
    )
  })
})
