import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'session_workouts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('session_id').unsigned().references('sessions.id').onDelete('CASCADE')

      table.string('title').notNullable()
      table.text('description').nullable()
      table.integer('reps').nullable()
      table.integer('sets').nullable()
      table.integer('time').nullable()
      table.string('image_url').nullable()
      table.string('youtube_url').nullable()
      table.boolean('is_done').notNullable().defaultTo(false)

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
