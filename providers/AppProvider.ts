import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { BaseResource } from 'App/Core/Resources/BaseResource'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Response = this.app.container.use('Adonis/Core/Response')
    const Request = this.app.container.use('Adonis/Core/Request')

    Response.macro('resource', function (resource: BaseResource, code) {
      const payload: any = {}

      if (resource.hasAdditional()) {
        const additional = resource.getAdditional()

        for (const key in additional) {
          const value = additional[key]
          payload[key] = value
        }
      }

      if (resource.isPaginated()) {
        const object = resource.toJSON() as any
        payload.meta = object.meta
        payload.data = object.data
      } else {
        payload.data = resource
      }

      return this.status(code ?? 200).json(payload)
    })

    Request.macro('bearerToken', function () {
      const header = this.header('Authorization')

      if (!header) {
        return null
      }

      const headers = header.split(',')

      for (const header of headers) {
        const fragments = header.split(' ')

        if (fragments.length === 2) {
          const name = fragments[0].trim()
          const token = fragments[1].trim()

          if (name === 'Bearer') {
            return token
          }
        }
      }

      return null
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
