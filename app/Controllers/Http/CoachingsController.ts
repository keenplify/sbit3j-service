import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coaching from 'App/Models/Coaching'
import { CoachingResource } from 'App/Resources/CoachingResource'
import StoreValidator from 'App/Validators/Coachings/StoreValidator'
import UpdateValidator from 'App/Validators/Coachings/UpdateValidator'

export default class CoachingsController {
  public async index({ response }: HttpContextContract) {
    const coaching = await Coaching.query()

    const resource = CoachingResource.collection(coaching)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const coaching = await Coaching.findOrFail(id)

    const resource = CoachingResource.make(coaching)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const coaching = await Coaching.create(values)

    const resource = CoachingResource.make(coaching)

    return response.resource(resource)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(UpdateValidator)

    const coaching = await Coaching.findOrFail(id)

    coaching.merge(values)

    await coaching.save()

    const resource = CoachingResource.make(coaching)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const coaching = await Coaching.query().where('id', id).firstOrFail()

    await coaching.delete()

    return response.status(204)
  }
}
