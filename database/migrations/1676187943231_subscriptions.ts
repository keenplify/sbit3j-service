import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('client_id')
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
        .notNullable()

      table.date('start_at').nullable()
      table.date('end_at').nullable()

      table.date('payment_date').nullable()
      table.string('payment_received').nullable()

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
