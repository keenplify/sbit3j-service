import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ClientFactory from 'Database/factories/ClientFactory'

export default class extends BaseSeeder {
  public async run() {
    await ClientFactory.createMany(7)
  }
}
