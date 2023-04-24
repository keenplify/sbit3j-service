import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import CoachFactory from 'Database/factories/CoachFactory'
import SessionFactory from 'Database/factories/SessionFactory'
import WorkoutLibraryFactory from 'Database/factories/WorkoutLibraryFactory'
import currency from 'currency.js'
import { Duration } from 'luxon'

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

    await SubscriptionProduct.updateOrCreate(
      {
        title: 'Basic',
      },
      {
        title: 'Basic',
        descriptionJSON: JSON.stringify([
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
        ]),
        priceString: currency(999).toString(),
        durationISO: Duration.fromObject({
          months: 1,
        }).toISO(),
      }
    )

    await SubscriptionProduct.updateOrCreate(
      {
        title: 'Plus',
      },
      {
        title: 'Plus',
        priceString: currency(5499).toString(),
        descriptionJSON: JSON.stringify([
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
        ]),
        durationISO: Duration.fromObject({
          months: 6,
        }).toISO(),
      }
    )

    await SubscriptionProduct.updateOrCreate(
      {
        title: 'Gold',
      },
      {
        title: 'Gold',
        priceString: currency(9999).toString(),
        descriptionJSON: JSON.stringify([
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
          'Lorem ipsum dolor amet',
        ]),
        durationISO: Duration.fromObject({
          year: 1,
        }).toISO(),
      }
    )

    await WorkoutLibraryFactory.createMany(7)

    const coaches = await CoachFactory.with('coachings', 3, (coachingBuilder) => {
      coachingBuilder.with('client', 3, (clientBuilder) => {
        clientBuilder.with('socialMedias', 2)
        clientBuilder.with('subscriptions', 1, (subscriptionBuilder) =>
          subscriptionBuilder.merge({
            subscriptionProductId: 1,
          })
        )
      })
    })
      .with('socialMedias', 2)
      .createMany(7)

    for (const coach of coaches) {
      const coachings = await coach
        .related('coachings')
        .query()
        .preload('client', (clientBuilder) => clientBuilder)

      for (const coaching of coachings) {
        await SessionFactory.merge({
          coachId: coaching.coachId,
          clientId: coaching.clientId,
        }).createMany(3)
      }
    }
  }
}
