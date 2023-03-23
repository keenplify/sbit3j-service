import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Session from 'App/Models/Session'
import { ClientResource } from 'App/Resources/ClientResource'
import { WorkoutResource } from 'App/Resources/WorkoutResource'

export class SessionResource extends BaseResource {
  public toObject(model: Session): ModelObject {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      clientId: model.clientId,
      client: model.client ? ClientResource.make(model.client) : undefined,
      coachId: model.coachId,
      coach: model.coach ? ClientResource.make(model.coach) : undefined,
      calories: model.calories,
      proteins: model.proteins,
      fats: model.fats,
      workouts: model.workouts ? WorkoutResource.collection(model.workouts) : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
