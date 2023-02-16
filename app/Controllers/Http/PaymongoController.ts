import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { paymongo } from 'App/Services/PaymongoService'
import { HandleRedirectValidatorSchema } from 'App/Validators/Paymongo/HandleRedirectValidator'
import Env from '@ioc:Adonis/Core/Env'
import Subscription from 'App/Models/Subscription'
import currency from 'currency.js'
import { PaymongoEventSchema } from 'App/Core/Zodios/Models/Paymongo/Event'

export default class PaymongoWebhookController {
  public async webhook({ request }: HttpContextContract) {
    const { attributes, type } = PaymongoEventSchema.parse(request.body())

    switch (type) {
      case 'payment.paid': {
        if (attributes.status === 'paid' && attributes.metadata?.subscriptionId) {
          const subscription = await Subscription.findOrFail(attributes.metadata.subscriptionId)

          subscription.payment = currency(attributes.amount).divide(10)

          await subscription.save()
        }

        break
      }
    }
  }

  public async handleRedirect({ request, response }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { payment_intent_id, final_url } = await request.validate({
      schema: HandleRedirectValidatorSchema,
      data: request.qs(),
    })

    const paymentIntent = await paymongo.fetchPaymentIntent({
      headers: {
        Authorization: Env.get('PAYMONGO_SECRET_KEY'),
      },
      params: {
        id: payment_intent_id,
      },
    })

    switch (paymentIntent.data.attributes.status) {
      case 'succeeded': {
        if (paymentIntent.data.attributes.metadata?.subscriptionId) {
          const subscription = await Subscription.findOrFail(
            paymentIntent.data.attributes.metadata.subscriptionId
          )

          subscription.payment = currency(paymentIntent.data.attributes.amount).divide(10)

          await subscription.save()
        }
        break
      }
    }

    if (final_url) {
      return response.redirect(final_url)
    }

    return response.json(paymentIntent)
  }
}
