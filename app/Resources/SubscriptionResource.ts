import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Subscription from 'App/Models/Subscription'
import { ClientResource } from 'App/Resources/ClientResource'

export class SubscriptionResource extends BaseResource {
  public toObject(model: Subscription): ModelObject {
    return {
      id: model.id,
      startAt: model.startAt,
      endAt: model.endAt,
      client: ClientResource.make(model.client),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
