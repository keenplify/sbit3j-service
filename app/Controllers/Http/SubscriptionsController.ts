import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import { DateTime } from 'luxon'
import { SubscriptionResource } from 'App/Resources/SubscriptionResource'
import Env from '@ioc:Adonis/Core/Env'
import { paymongo } from 'App/Services/PaymongoService'
import Database from '@ioc:Adonis/Lucid/Database'
import { PaymentMethods } from 'App/Enums/PaymentMethods'
import ManualSubscribeValidator from 'App/Validators/Subscriptions/ManualSubscribeValidator'
import InitializeValidator from 'App/Validators/Subscriptions/InitializeValidator'
export default class SubscriptionsController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const subscriptions = await Subscription.query()
      .where('clientId', user.id)
      .orderBy('payment_date', 'desc')
      .preload('subscriptionProduct')

    // subscriptions.sort((a, b) => {
    //   const aIsActive = a.isActive()
    //   const bIsActive = b.isActive()
    //   if (aIsActive === bIsActive) {
    //     // If both subscriptions are active or inactive, sort by created_at descending
    //     return b.createdAt.toJSDate() - a.createdAt.toJSDate()
    //   } else if (aIsActive) {
    //     // If subscription a is active and subscription b is inactive, sort a first
    //     return -1
    //   } else {
    //     // If subscription b is active and subscription a is inactive, sort b first
    //     return 1
    //   }
    // })

    const resource = SubscriptionResource.collection(subscriptions)

    return response.resource(resource)
  }

  public async current({ response, auth }: HttpContextContract) {
    const user = auth.use('client').user!

    const subscription = await user.activeSubscription()

    console.log({ subscription })

    if (subscription === null) {
      return response.notFound()
    }

    const resource = SubscriptionResource.make(subscription)

    return response.resource(resource)
  }

  public async manualSubscribe({ request }: HttpContextContract) {
    const { clientId, subscriptionProductId } = await request.validate(ManualSubscribeValidator)

    const product = await SubscriptionProduct.findOrFail(subscriptionProductId)

    const subscription = await Subscription.create({
      clientId,
      startAt: DateTime.now(),
      endAt: DateTime.now().plus(product.duration),
      paymentReceived: product.priceString,
      subscriptionProductId: product.id,
      paymentDate: DateTime.now(),
    })

    const resource = SubscriptionResource.make(subscription)

    return resource
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
        subscriptionProductId,
      })

      const paymentIntent = await paymongo.createPaymentIntent({
        headers: {
          Authorization: Env.get('PAYMONGO_SECRET_KEY'),
        },
        body: {
          data: {
            attributes: {
              amount: subscriptionProduct.price.multiply(100).value,
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

      await trx.commit()

      return response.resource(resource)
    } catch (error) {
      await trx.rollback()

      throw error
    }
  }
}
