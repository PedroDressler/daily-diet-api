import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.uuid('user_id').references('user.id')
    table.string('name').notNullable()
    table.string('description')
    table.tinyint('rating').notNullable().defaultTo(0)
    table.timestamps(true, true)
    table.date('date').notNullable()
    table.boolean('is_on_diet').notNullable().defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('meals')
}
