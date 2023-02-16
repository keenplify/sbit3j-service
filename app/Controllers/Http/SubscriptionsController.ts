import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import InitializeValidator from 'App/Validators/Subscriptions/InitializeValidator'
import { DateTime } from 'luxon'
import { SubscriptionResource } from 'App/Resources/SubscriptionResource'
import Env from '@ioc:Adonis/Core/Env'
import { paymongo } from 'App/Services/PaymongoService'
import Database from '@ioc:Adonis/Lucid/Database'
export default class SubscriptionsController {
  /**
   * Creates a subscription and returns a subscription together with the payment intent to be paid
   */
  public async initialize({ request, response, auth }: HttpContextContract) {
    const client = auth.use('client').user!

    const { subscriptionProductId } = await request.validate(InitializeValidator)

    const trx = await Database.transaction()

    try {
      const subscriptionProduct = await SubscriptionProduct.findOrFail(subscriptionProductId, {
        client: trx,
      })

      const subscription = await Subscription.create({
        clientId: client.id,
        startAt: DateTime.now(),
        endAt: DateTime.now().plus(subscriptionProduct.duration),
      })

      const paymentIntent = await paymongo.createPaymentIntent({
        headers: {
          Authorization: Env.get('PAYMONGO_SECRET_KEY'),
        },
        body: {
          data: {
            attributes: {
              amount: subscriptionProduct.price.multiply(10).value,
              currency: 'PHP',
              payment_method_allowed: ['card', 'gcash', 'paymaya'],
              capture_type: 'automatic',
              metadata: {
                clientId: `${client.id}`,
                subscriptionId: `${subscription.id}`,
                subscriptionProductId: `${subscriptionProductId}`,
              },
            },
          },
        },
      })

      const resource = SubscriptionResource.make(subscription).additional({ paymentIntent })

      trx.commit()

      return response.resource(resource)
    } catch (error) {
      trx.rollback()

      throw error
    }
  }
}
