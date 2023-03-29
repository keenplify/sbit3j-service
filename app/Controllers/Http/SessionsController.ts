import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import Session from 'App/Models/Session'
import { SessionResource } from 'App/Resources/SessionResource'
import SessionStoreValidator from 'App/Validators/Sessions/StoreValidator'
import SessionUpdateValidator from 'App/Validators/Sessions/UpdateValidator'

export default class SessionsController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!

    const sessionsQuery = Session.query()

    if (user instanceof Client) {
      sessionsQuery.where('clientId', user.id)
    } else if (user instanceof Coach) {
      sessionsQuery.where('coachId', user.id)
    }

    const sessions = await sessionsQuery

    const resource = SessionResource.collection(sessions)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const session = await Session.query()
      .preload('workouts')
      .preload('client')
      .preload('coach')
      .where('id', id)
      .firstOrFail()

    const resource = SessionResource.make(session)

    return response.resource(resource)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const coach = auth.user! as Coach

    const { workouts, ...sessionValues } = await request.validate(SessionStoreValidator)

    const session = await Session.create({
      coachId: coach.id,
      ...sessionValues,
    })

    if (workouts !== undefined) {
      await session.related('workouts').createMany(workouts)
    }

    await session.load('workouts')

    const resource = SessionResource.make(session)

    return response.resource(resource)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params

    const { workouts, ...sessionValues } = await request.validate(SessionUpdateValidator)

    const session = await Session.findOrFail(id)

    session.merge(sessionValues)

    if (workouts !== undefined) {
      await session.related('workouts').query().delete()
      await session.related('workouts').createMany(workouts)
    }

    await session.save()

    await session.load('workouts')

    const resource = SessionResource.make(session)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const session = await Session.query().where('id', id).firstOrFail()

    await session.delete()

    return response.status(204)
  }
}
