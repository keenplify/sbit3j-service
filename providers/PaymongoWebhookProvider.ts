import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { paymongo } from 'App/Services/PaymongoService'
import Env from '@ioc:Adonis/Core/Env'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class PaymongoWebhookProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // All bindings are ready, feel free to use them
    try {
      await paymongo.createWebhook({
        headers: {
          Authorization: Env.get('PAYMONGO_SECRET_KEY'),
        },
        body: {
          data: {
            attributes: {
              events: ['payment.paid'],
              url: `${Env.get('SERVER_URL')}/v1/paymongo/webhook`,
            },
          },
        },
      })
      this.app.logger.info('Webhook successfully registered')
    } catch (error) {}
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
