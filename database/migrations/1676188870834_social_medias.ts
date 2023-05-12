import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'social_medias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE').nullable()
      table.integer('coach_id').unsigned().references('coaches.id').onDelete('CASCADE').nullable()

      table.string('link').notNullable()
      table.string('title').notNullable() // Facebook, Instagram, etc...
      table.string('name').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
