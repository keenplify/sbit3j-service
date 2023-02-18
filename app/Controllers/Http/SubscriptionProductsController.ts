import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'
import { SubscriptionProductResource } from 'App/Resources/SubscriptionProductResource'
import StoreValidator from 'App/Validators/Subscriptions/StoreValidator'
import UpdateValidator from 'App/Validators/Subscriptions/UpdateValidator'

export default class SubscriptionProductsController {
  public async index({ response }: HttpContextContract) {
    const coaches = await SubscriptionProduct.query()

    const resource = SubscriptionProductResource.collection(coaches)

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
    const data = request.only(['name', 'description', 'price'])
  
    await request.validate({
      schema: new StoreValidator().schema,
      messages: new StoreValidator().messages,
    })
  
    const subscriptionProduct = await SubscriptionProduct.create(data)
  
    const resource = new SubscriptionProductResource(subscriptionProduct)
  
    return response.resource(resource)
  }

    // update
  public async update({ params, request, response }: HttpContextContract) {
    const subscriptionProduct = await SubscriptionProduct.findOrFail(params.id)
  
    const data = request.only(['name', 'description', 'price'])
  
    await request.validate({
      schema: new UpdateValidator().schema,
      messages: new UpdateValidator().messages,
    })
  
    subscriptionProduct.merge(data)
  
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
