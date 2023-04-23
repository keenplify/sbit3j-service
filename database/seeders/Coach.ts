import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CoachFactory from 'Database/factories/CoachFactory'

export default class extends BaseSeeder {
  public async run() {
    await CoachFactory.with('coachings', 3, (coachingBuilder) => {
      coachingBuilder.with('client', 3, (clientBuilder) => {
        clientBuilder.with('socialMedias', 2)
      })
    })
      .with('sessions', 4, (sesionBuilder) => {
        sesionBuilder.with('workouts', 3)
      })
      .with('socialMedias', 2)
      .createMany(7)
  }
}
