import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.integer('coach_id').unsigned().references('coaches.id').onDelete('CASCADE')

      // TODO - Many Workouts (new table), kada workout may boolean if done or not

      table.float('calories').nullable()
      table.float('proteins').nullable()
      table.float('fats').nullable()
      // TODO - Other nutrients

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
