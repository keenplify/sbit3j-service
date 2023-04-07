import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Subscription from 'App/Models/Subscription'
import { ClientResource } from 'App/Resources/ClientResource'
import { SubscriptionProductResource } from 'App/Resources/SubscriptionProductResource'
import { DateTime } from 'luxon'

export class SubscriptionResource extends BaseResource {
  public toObject(model: Subscription): ModelObject {
    return {
      id: model.id,
      paymentDate: model.paymentDate,
      paymentReceived: model.paymentReceived,
      startAt: model.startAt,
      endAt: model.endAt,
      isActive: model.isActive(),
      clientId: model.clientId,
      client: model.client ? ClientResource.make(model.client) : undefined,
      subscriptionProductId: model.subscriptionProductId,
      subscriptionProduct: model.subscriptionProduct
        ? SubscriptionProductResource.make(model.subscriptionProduct)
        : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
