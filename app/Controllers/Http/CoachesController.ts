import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coach from 'App/Models/Coach'
import { CoachResource } from 'App/Resources/CoachResource'
import { CoachesIndexSchema } from 'App/Validators/Coaches/IndexValidator'
import StoreValidator from 'App/Validators/Coaches/StoreValidator'
import UpdateValidator from 'App/Validators/Coaches/UpdateValidator'

export default class CoachesController {
  public async index({ request, response }: HttpContextContract) {
    const { keyword } = await request.validate({
      schema: CoachesIndexSchema,
      data: request.qs(),
    })

    const coachesQuery = Coach.query().preload('coachings', (coachings) =>
      coachings.preload('client')
    )

    if (keyword !== undefined && keyword.length > 0) {
      coachesQuery.orWhere((query) => {
        query.orWhere('firstName', 'like', `%${keyword}%`)
        query.orWhere('middleName', 'like', `%${keyword}%`)
        query.orWhere('lastName', 'like', `%${keyword}%`)
        query.orWhere('email', 'like', `%${keyword}%`)
        query.orWhere('phone', 'like', `%${keyword}%`)
      })
    }

    const resource = CoachResource.collection(await coachesQuery)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const coach = await Coach.query()
      .preload('coachings', (coachings) => coachings.preload('client'))
      .where('id', id)
      .firstOrFail()

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
