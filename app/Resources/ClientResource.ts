import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Client from 'App/Models/Client'
import { SocialMediaResource } from 'App/Resources/SocialMediaResource'
import { SubscriptionResource } from 'App/Resources/SubscriptionResource'

export class ClientResource extends BaseResource {
  public toObject(model: Client): ModelObject {
    return {
      id: model.id,
      firstName: model.firstName,
      middleName: model.middleName,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      subscriptions: model.subscriptions
        ? SubscriptionResource.collection(model.subscriptions)
        : undefined,
      socialMedias: model.socialMedias
        ? SocialMediaResource.collection(model.socialMedias)
        : undefined,
    }
  }
}
