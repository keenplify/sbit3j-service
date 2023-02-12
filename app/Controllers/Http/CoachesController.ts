import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coach from 'App/Models/Coach'
import { CoachResource } from 'App/Resources/CoachResource'
import StoreValidator from 'App/Validators/Coaches/StoreValidator'
import UpdateValidator from 'App/Validators/Coaches/UpdateValidator'

export default class CoachesController {
  public async index({ response }: HttpContextContract) {
    const coaches = await Coach.query()

    const resource = CoachResource.collection(coaches)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const coach = await Coach.findOrFail(id)

    const resource = CoachResource.make(coach)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const coach = await Coach.create(values)

    const resource = CoachResource.make(coach)

    return response.resource(resource)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(UpdateValidator)

    const coach = await Coach.findOrFail(id)

    coach.merge(values)

    await coach.save()

    const resource = CoachResource.make(coach)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const coach = await Coach.query().where('id', id).firstOrFail()

    await coach.delete()

    return response.status(204)
  }
}
