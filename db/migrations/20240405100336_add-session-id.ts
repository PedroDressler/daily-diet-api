import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('users', (table) => {
    table.string('session_id').unique().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.alterTable('users', (table) => {
    table.dropColumn('session_id')
  })
}
