import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { ClientResource } from 'App/Resources/ClientResource'
import StoreValidator from 'App/Validators/Clients/StoreValidator'
import UpdateValidator from 'App/Validators/Clients/UpdateValidator'

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.query()

    const resource = ClientResource.collection(clients)

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

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params

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
