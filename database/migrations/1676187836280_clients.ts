import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('middle_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('phone').notNullable().unique()
      table.string('password').notNullable()
      table.string('gender').notNullable()
      table.boolean('requires_coaching').nullable()

      table.integer('age').nullable()
      table.float('weight').nullable()
      table.float('height').nullable()
      table.string('workout_level').nullable()
      table.string('workout_preference').nullable()
      table.string('availability').nullable()
      table.string('coach_gender_preference').nullable()
      table.string('goal').nullable()
      table.string('notes').nullable()

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
