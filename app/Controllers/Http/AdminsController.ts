import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import { AdminResource } from 'App/Resources/AdminResource'
import StoreValidator from 'App/Validators/Admins/Auth/StoreValidator'
import UpdateValidator from 'App/Validators/Admins/Auth/UpdateValidator'

export default class AdminsController {
  public async index({ response }: HttpContextContract) {
    const admins = await Admin.query()

    const resource = AdminResource.collection(admins)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const admin = await Admin.findOrFail(id)

    const resource = AdminResource.make(admin)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const admin = await Admin.create(values)

    const resource = AdminResource.make(admin)

    return response.resource(resource)
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params

    const values = await request.validate(UpdateValidator)

    const admin = await Admin.findOrFail(id)

    admin.merge(values)

    await admin.save()

    const resource = AdminResource.make(admin)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const admin = await Admin.query().where('id', id).firstOrFail()

    await admin.delete()

    return response.status(204)
  }
}
