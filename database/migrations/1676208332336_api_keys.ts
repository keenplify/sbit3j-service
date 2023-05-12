import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('auth_id').unsigned().index().notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('expires_at').nullable()
      table.string('name').notNullable()
      table.string('token').notNullable().unique()
      table.string('type').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
