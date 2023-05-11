import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Coach from 'App/Models/Coach'
import { CoachingResource } from 'App/Resources/CoachingResource'
import { SocialMediaResource } from 'App/Resources/SocialMediaResource'

export class CoachResource extends BaseResource {
  public toObject(model: Coach): ModelObject {
    return {
      id: model.id,
      firstName: model.firstName,
      middleName: model.middleName,
      lastName: model.lastName,
      gender: model.gender,
      email: model.email,
      phone: model.phone,
      socialMedias: model.socialMedias
        ? SocialMediaResource.collection(model.socialMedias)
        : undefined,
      coachings: CoachingResource.collection(this.whenLoaded(model.coachings)),
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
