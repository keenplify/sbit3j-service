import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coach from 'App/Models/Coach'
import StoreValidator from 'App/Validators/Coaches/StoreValidator'
import UpdateValidator from 'App/Validators/Coaches/UpdateValidator'

export default class CoachesController {
  public async index() {
    const coaches = await Coach.query()

    return coaches
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    const coach = await Coach.findOrFail(id)

    return coach
  }

  public async store({ request }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const coach = await Coach.create(values)

    return coach
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(UpdateValidator)

    const coach = await Coach.findOrFail(id)

    coach.merge(values)

    return coach
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const coach = await Coach.query().where('id', id).delete()

    return coach
  }
}
