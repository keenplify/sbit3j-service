import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CoachFactory from 'Database/factories/CoachFactory'

export default class extends BaseSeeder {
  public async run() {
    await CoachFactory.createMany(7)
  }
}
