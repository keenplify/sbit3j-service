import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Coaching from 'App/Models/Coaching'
import { ClientResource } from 'App/Resources/ClientResource'
import { CoachResource } from 'App/Resources/CoachResource'
//import { SocialMediaResource } from 'App/Resources/SocialMediaResource'

export class CoachingResource extends BaseResource {
  public toObject(model: Coaching): ModelObject {
    return {
      id: model.id,
      clientId: model.clientId,
      client: model.client ? ClientResource.make(model.client) : undefined,
      coachId: model.coachId,
      coach: model.coach ? CoachResource.make(model.coach) : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
