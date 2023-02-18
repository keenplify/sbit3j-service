import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'

export default class extends BaseSeeder {
  public async run() {
    await Admin.updateOrCreate(
      {
        email: 'superadmin@sbit3j.com',
      },
      {
        firstName: 'Super',
        middleName: 'Admin',
        lastName: 'SBIT3J',
        email: 'superadmin@sbit3j.com',
        password: 'password',
        phone: '+639062281234',
      }
    )
  }
}
