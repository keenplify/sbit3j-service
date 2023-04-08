import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import currency from 'currency.js'
import { Duration } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
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
  }
}
