import BaseSchema from '@ioc:Adonis/Lucid/Schema'

// Workout libraries = dummy workouts na pwede ilagay per day
export default class extends BaseSchema {
  protected tableName = 'workout_libraries' //

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE').nullable()
      table.integer('admin_id').unsigned().references('admins.id').onDelete('CASCADE').nullable()

      table.text('title').notNullable()
      table.string('description').notNullable()
      table.integer('reps').notNullable() // Recommended reps, set and time lang pwede baguhin ni coach
      table.integer('sets').notNullable()
      table.integer('time').nullable()
      table.json('muscle_groups_json').nullable()
      table.string('image_url').nullable()
      table.string('youtube_url').nullable()

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
