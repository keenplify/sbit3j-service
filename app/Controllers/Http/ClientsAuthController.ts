import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { ClientResource } from 'App/Resources/ClientResource'
import LoginValidator from 'App/Validators/Clients/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Clients/Auth/RegisterValidator'

export default class ClientsAuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const guard = auth.use('client')

    const { email, password } = await request.validate(LoginValidator)

    const payload = await guard.attempt(email, password)

    const resource = ClientResource.make(payload.user).additional({
      access: payload.toJSON(),
    })

    return response.resource(resource)
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const values = await request.validate(RegisterValidator)
    const guard = auth.use('client')

    const client = await Client.create(values)

    const payload = await guard.generate(client)

    const resource = ClientResource.make(payload.user).additional({
      access: payload.toJSON(),
    })

    return response.resource(resource, 201)
  }

  public check({ auth, response }: HttpContextContract) {
    const resource = ClientResource.make(auth.use('client').user)

    return response.resource(resource)
  }

  public async logout({ auth, response }: HttpContextContract) {
    const guard = auth.use('client')

    await guard.logout()

    return response.status(204)
  }
}
