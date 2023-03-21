import Factory from '@ioc:Adonis/Lucid/Factory'
import Subscription from 'App/Models/Subscription'
import SubscriptionProductFactory from 'Database/factories/SubscriptionProductFactory'
import { DateTime } from 'luxon'

export default Factory.define(Subscription, ({ faker }) => {
  return {
    paymentDate: DateTime.now(),
    paymentReceived: faker.datatype.number().toString(),
    startAt: DateTime.now().minus({ days: 7 }),
    endAt: DateTime.now().plus({ month: 1 }),
  }
})
  .relation('subscriptionProduct', () => SubscriptionProductFactory)
  .build()
