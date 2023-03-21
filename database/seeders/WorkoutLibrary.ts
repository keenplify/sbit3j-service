import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import WorkoutLibraryFactory from 'Database/factories/WorkoutLibraryFactory'

export default class extends BaseSeeder {
  public async run() {
    await WorkoutLibraryFactory.createMany(7)
  }
}
