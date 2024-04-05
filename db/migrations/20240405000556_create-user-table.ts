import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable('users', (table) => {
      table.uuid('id').primary()
      table.text('name').notNullable()
    })
    .createTable('meals', (table) => {
      table.uuid('id').primary()
      table.text('name').notNullable()
      table.text('description')
      table.tinyint('rating').notNullable().defaultTo(0)
      table.timestamp('meal_date_time').notNullable().defaultTo(knex.fn.now())
      table.boolean('is_on_diet').notNullable().defaultTo(false)
    })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('users').dropTableIfExists('meals')
}
