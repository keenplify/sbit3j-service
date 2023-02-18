import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import { SubscriptionProductResource } from 'App/Resources/SubscriptionProductResource'

export default class SubscriptionProductsController {
  public async index({ response }: HttpContextContract) {
    const coaches = await SubscriptionProduct.query()

    const resource = SubscriptionProductResource.collection(coaches)

    return response.resource(resource)
  }

  public async show({}: HttpContextContract) {
    throw 'TODO: Not implemented'
  }

  public async store({}: HttpContextContract) {
    throw 'TODO: Not implemented'
  }

  public async update({}: HttpContextContract) {
    throw 'TODO: Not implemented'
  }

  public async destroy({}: HttpContextContract) {
    throw 'TODO: Not implemented'
  }
}
