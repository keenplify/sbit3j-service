import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import Coaching from 'App/Models/Coaching'
import { CoachingResource } from 'App/Resources/CoachingResource'
import StoreValidator from 'App/Validators/Coachings/StoreValidator'

export default class CoachingsController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user! as Client | Coach

    const coachingQuery = Coaching.query()

    if (user instanceof Client) {
      coachingQuery.where('client_id', user.id)
    }

    if (user instanceof Coach) {
      coachingQuery.where('coach_id', user.id)
    }

    const resource = CoachingResource.collection(await coachingQuery)

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

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const coaching = await Coaching.query().where('id', id).firstOrFail()

    await coaching.delete()

    return response.status(204)
  }
}
