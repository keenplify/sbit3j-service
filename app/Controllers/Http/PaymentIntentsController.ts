import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { paymongo } from 'App/Services/PaymongoService'
import AttachValidator from 'App/Validators/PaymentIntents/AttachValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class PaymentIntentsController {
  public async attach({ request }: HttpContextContract) {
    const { clientKey, paymentMethod, returnUrl, paymentIntentId } = await request.validate(
      AttachValidator
    )

    const attach = await paymongo.attachToPaymentIntent({
      headers: {
        Authorization: Env.get('PAYMONGO_SECRET_KEY'),
      },
      params: {
        id: paymentIntentId,
      },
      body: {
        data: {
          attributes: {
            client_key: clientKey,
            payment_method: paymentMethod,
            return_url: returnUrl,
          },
        },
      },
    })

    return attach
  }
}
