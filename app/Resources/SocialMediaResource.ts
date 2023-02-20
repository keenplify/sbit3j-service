import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import SocialMedia from 'App/Models/SocialMedia'
import { ClientResource } from 'App/Resources/ClientResource'
import { CoachResource } from 'App/Resources/CoachResource'

export class SocialMediaResource extends BaseResource {
  public toObject(model: SocialMedia): ModelObject {
    return {
      id: model.id,
      clientId: model.clientId,
      client: model.client ? ClientResource.make(model.client) : undefined,
      coachId: model.coachId,
      coach: model.coach ? CoachResource.make(model.coach) : undefined,
      title: model.title,
      name: model.name,
      link: model.link,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
