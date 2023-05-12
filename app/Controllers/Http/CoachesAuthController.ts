import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coach from 'App/Models/Coach'
import { CoachResource } from 'App/Resources/CoachResource'
import LoginValidator from 'App/Validators/Coaches/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Coaches/Auth/RegisterValidator'

export default class CoachesAuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const guard = auth.use('coach')

    const { email, password } = await request.validate(LoginValidator)

    const payload = await guard.attempt(email, password)

    const resource = CoachResource.make(payload.user).additional({
      access: payload.toJSON(),
    })

    return response.resource(resource)
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const values = await request.validate(RegisterValidator)
    const guard = auth.use('coach')

    const coach = await Coach.create(values)

    const payload = await guard.generate(coach)

    const resource = CoachResource.make(payload.user).additional({
      access: payload.toJSON(),
    })

    return response.resource(resource, 201)
  }

  public check({ auth, response }: HttpContextContract) {
    const resource = CoachResource.make(auth.use('coach').user)

    return response.resource(resource)
  }

  public async logout({ auth, response }: HttpContextContract) {
    const guard = auth.use('coach')

    await guard.logout()

    return response.status(204)
  }
}
