import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import { ClientResource } from 'App/Resources/ClientResource'
import { ClientsIndexSchema } from 'App/Validators/Clients/IndexValidator'
import StoreValidator from 'App/Validators/Clients/StoreValidator'
import UpdateValidator from 'App/Validators/Clients/UpdateValidator'

export default class ClientsController {
  public async index({ request, response, auth }: HttpContextContract) {
    const user = auth.user!

    const { keyword } = await request.validate({
      schema: ClientsIndexSchema,
      data: request.qs(),
    })

    const clientsQuery = Client.query().preload('coachings').orderBy('requires_coaching', 'asc')

    if (keyword !== undefined && keyword.length > 0) {
      clientsQuery.orWhere((query) => {
        query.orWhere('firstName', 'like', `%${keyword}%`)
        query.orWhere('middleName', 'like', `%${keyword}%`)
        query.orWhere('lastName', 'like', `%${keyword}%`)
        query.orWhere('email', 'like', `%${keyword}%`)
        query.orWhere('phone', 'like', `%${keyword}%`)
      })
    }

    if (user instanceof Coach) {
      clientsQuery.whereHas('coachings', (coachingBuilder) =>
        coachingBuilder.where('coachId', user.id)
      )
    }

    const resource = ClientResource.collection(await clientsQuery)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const client = await Client.findOrFail(id)

    const resource = ClientResource.make(client)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    const values = await request.validate(StoreValidator)

    const client = await Client.create(values)

    const resource = ClientResource.make(client)

    return response.resource(resource)
  }

  public async update({ request, params, response, auth }: HttpContextContract) {
    const user = auth.user!

    const { id } = params

    if (user instanceof Client && user.id !== Number.parseInt(id))
      throw new Exception('Blocked - you have no access to this endpoint', 401)

    const values = await request.validate(UpdateValidator)

    const client = await Client.findOrFail(id)

    client.merge(values)

    await client.save()

    const resource = ClientResource.make(client)

    return response.resource(resource)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params

    const client = await Client.query().where('id', id).firstOrFail()

    await client.delete()

    return response.status(204)
  }
}
