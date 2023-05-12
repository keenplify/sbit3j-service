import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AdminResource } from 'App/Resources/AdminResource'
import LoginValidator from 'App/Validators/Admins/Auth/LoginValidator'

export default class AdminsAuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const guard = auth.use('admin')

    const { email, password } = await request.validate(LoginValidator)

    const payload = await guard.attempt(email, password)

    const resource = AdminResource.make(payload.user).additional({
      access: payload.toJSON(),
    })

    return response.resource(resource)
  }

  public check({ auth, response }: HttpContextContract) {
    const resource = AdminResource.make(auth.use('admin').user)

    return response.resource(resource)
  }

  public async logout({ auth, response }: HttpContextContract) {
    const guard = auth.use('admin')

    await guard.logout()

    return response.status(204)
  }
}
