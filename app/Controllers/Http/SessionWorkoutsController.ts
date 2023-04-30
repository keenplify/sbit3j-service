import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SessionWorkout from 'App/Models/SessionWorkout'
import { WorkoutResource } from 'App/Resources/WorkoutResource'
import SessionWorkoutStoreValidator from 'App/Validators/SessionWorkouts/StoreValidator'
import SessionWorkoutUpdateValidator from 'App/Validators/SessionWorkouts/UpdateValidator'

export default class SessionWorkoutsController {
  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const session = await SessionWorkout.findOrFail(id)

    const resource = WorkoutResource.make(session)

    return response.resource(resource)
  }

  public async store({ request, response, params }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(SessionWorkoutStoreValidator)

    const workout = await SessionWorkout.findOrFail(id)

    workout.merge(values)

    await workout.save()

    const resource = WorkoutResource.make(workout)

    return response.resource(resource)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(SessionWorkoutUpdateValidator)

    const workout = await SessionWorkout.findOrFail(id)

    workout.merge(values)

    await workout.save()

    const resource = WorkoutResource.make(workout)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const workout = await SessionWorkout.query().where('id', id).firstOrFail()

    await workout.delete()

    return response.status(204)
  }
}
