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
        priceString: currency(1000).toString(),
        durationISO: Duration.fromObject({
          months: 1,
        }).toISO(),
      }
    )

    await SubscriptionProduct.updateOrCreate(
      {
        title: 'Standard',
      },
      {
        title: 'Standard',
        priceString: currency(1500).toString(),
        durationISO: Duration.fromObject({
          months: 6,
        }).toISO(),
      }
    )

    await SubscriptionProduct.updateOrCreate(
      {
        title: 'Premium',
      },
      {
        title: 'Premium',
        priceString: currency(1500).toString(),
        durationISO: Duration.fromObject({
          year: 1,
        }).toISO(),
      }
    )
  }
}
