import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import SessionWorkout from 'App/Models/SessionWorkout'
import WorkoutLibrary from 'App/Models/WorkoutLibrary'

export class WorkoutResource extends BaseResource {
  public toObject(model: WorkoutLibrary | SessionWorkout): ModelObject {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      reps: model.reps,
      set: model.sets,
      time: model.time,
      imageUrl: model.imageUrl,
      youtubeUrl: model.youtubeUrl,
      isDone: model instanceof SessionWorkout ? model.isDone : undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
