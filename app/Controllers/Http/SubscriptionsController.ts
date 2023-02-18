import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import InitializeValidator from 'App/Validators/Subscriptions/InitializeValidator'
import { DateTime } from 'luxon'
import { SubscriptionResource } from 'App/Resources/SubscriptionResource'
import Env from '@ioc:Adonis/Core/Env'
import { paymongo } from 'App/Services/PaymongoService'
import Database from '@ioc:Adonis/Lucid/Database'
import { PaymentMethods } from 'App/Enums/PaymentMethods'
export default class SubscriptionsController {
  public async current() {
    throw 'TODO: Unimplemented'
  }

  /**
   * Creates a subscription and returns a subscription together with the payment intent to be paid which has already attached payment method
   */
  public async initialize({ request, response, auth }: HttpContextContract) {
    const client = auth.use('client').user!

    const { subscriptionProductId, paymentMethodId } = await request.validate(InitializeValidator)

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
              payment_method_allowed: PaymentMethods,
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

      const attach = await paymongo.attachToPaymentIntent({
        headers: {
          Authorization: Env.get('PAYMONGO_SECRET_KEY'),
        },
        params: {
          id: paymentIntent.data.id,
        },
        body: {
          data: {
            attributes: {
              client_key: paymentIntent.data.attributes.client_key,
              payment_method: paymentMethodId,
              return_url: `${Env.get('SERVER_URL')}/v1/paymongo/handle-redirect`,
            },
          },
        },
      })

      const resource = SubscriptionResource.make(subscription)

      if (attach.data.attributes.next_action?.redirect?.url) {
        resource.additional({
          redirect_url: attach.data.attributes.next_action?.redirect?.url,
        })
      }

      trx.commit()

      return response.resource(resource)
    } catch (error) {
      trx.rollback()

      throw error
    }
  }
}
