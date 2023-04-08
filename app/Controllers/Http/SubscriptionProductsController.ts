import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import { SubscriptionProductResource } from 'App/Resources/SubscriptionProductResource'
import UpdateValidator from 'App/Validators/SubscriptionProducts/UpdateValidator'
import { Duration } from 'luxon'
import humanInterval from 'human-interval'
import currency from 'currency.js'
import InvalidDurationException from 'App/Exceptions/InvalidDurationException'
import StoreValidator from 'App/Validators/SubscriptionProducts/StoreValidator'

export default class SubscriptionProductsController {
  public async index({ response }: HttpContextContract) {
    const products = await SubscriptionProduct.query()

    const resource = SubscriptionProductResource.collection(products)

    return response.resource(resource)
  }

  // Emman
  // show
  public async show({ params, response }: HttpContextContract) {
    const subscriptionProduct = await SubscriptionProduct.findOrFail(params.id)

    const resource = new SubscriptionProductResource(subscriptionProduct)

    return response.resource(resource)
  }

  // store
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const msInterval = humanInterval(data.duration)

    if (!msInterval) throw new InvalidDurationException()

    const subscriptionProduct = await SubscriptionProduct.create({
      durationISO: Duration.fromMillis(msInterval).shiftTo('months', 'days', 'hours').toISO(),
      priceString: currency(data.price).toString(),
      title: data.title,
      description: data.description,
    })

    const resource = SubscriptionProductResource.make(subscriptionProduct)

    return response.resource(resource)
  }

  // update
  public async update({ params, request, response }: HttpContextContract) {
    // TODO - change name to title, support update durationISO and priceString update (refer to line 38-42)
    const subscriptionProduct = await SubscriptionProduct.findOrFail(params.id)

    const data = await request.validate(UpdateValidator)

    const msInterval = humanInterval(data.duration)

    if (!msInterval) throw new InvalidDurationException()

    subscriptionProduct.merge({
      title: data.title,
      description: data.description,
      durationISO: Duration.fromMillis(msInterval).shiftTo('months', 'days', 'hours').toISO(),
      priceString: data.price ? currency(data.price).toString() : undefined,
    })

    await subscriptionProduct.save()

    const resource = new SubscriptionProductResource(subscriptionProduct)

    return response.resource(resource)
  }

  // destroy
  public async destroy({ params, response }: HttpContextContract) {
    const subscriptionProduct = await SubscriptionProduct.findOrFail(params.id)

    await subscriptionProduct.delete()

    return response.noContent()
  }
}
