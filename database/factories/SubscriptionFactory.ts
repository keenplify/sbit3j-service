import Factory from '@ioc:Adonis/Lucid/Factory'
import Subscription from 'App/Models/Subscription'
import SubscriptionProductFactory from 'Database/factories/SubscriptionProductFactory'
import { DateTime } from 'luxon'

export default Factory.define(Subscription, ({ faker }) => {
  const startAt = DateTime.now().plus({
    day: faker.datatype.number({ min: -14, max: 14 }),
  })
  const endAt = startAt.plus({ month: 1 })

  return {
    paymentDate: startAt,
    paymentReceived: faker.datatype.number().toString(),
    startAt,
    endAt,
  }
})
  .relation('subscriptionProduct', () => SubscriptionProductFactory)
  .build()
