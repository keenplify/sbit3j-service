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
      coachingQuery.where('client_id', user.id).preload('coach')
    }

    if (user instanceof Coach) {
      coachingQuery.where('coach_id', user.id).preload('client')
    }

    const resource = CoachingResource.collection(await coachingQuery)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const coaching = await Coaching.query()
      .preload('client')
      .preload('coach')
      .where('id', id)
      .firstOrFail()

    const resource = CoachingResource.make(coaching)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const coaching = await Coaching.create(values)

    const client = await Client.findOrFail(values.clientId)

    await client.related('coachings').query().delete()

    client.requiresCoaching = false

    await client.save()

    const resource = CoachingResource.make(coaching)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const coaching = await Coaching.query().where('id', id).firstOrFail()

    if (coaching.clientId) {
      const client = await Client.findOrFail(coaching.coachId)

      client.requiresCoaching = true

      await client.save()
    }

    await coaching.delete()

    return response.status(204)
  }
}
