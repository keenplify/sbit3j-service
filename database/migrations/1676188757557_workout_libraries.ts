import BaseSchema from '@ioc:Adonis/Lucid/Schema'

// Workout libraries = dummy workouts na pwede ilagay per day
export default class extends BaseSchema {
  protected tableName = 'workout_libraries' //

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE').nullable()
      table.integer('admin_id').unsigned().references('admins.id').onDelete('CASCADE').nullable()

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('reps').notNullable() // Recommended reps, set and time lang pwede baguhin ni coach
      table.integer('set').notNullable()
      table.integer('time').nullable()
      table.string('image_url').nullable()

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
