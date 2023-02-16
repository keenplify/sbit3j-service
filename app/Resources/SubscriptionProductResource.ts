import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import SubscriptionProduct from 'App/Models/SubscriptionProduct'

export class SubscriptionProductResource extends BaseResource {
  public toObject(model: SubscriptionProduct): ModelObject {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      price: model.price.format({
        symbol: '₱',
      }),
      duration: model.duration.toHuman(),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
