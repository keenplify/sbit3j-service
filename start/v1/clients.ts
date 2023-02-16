import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'ClientsAuthController.login').as('login')
    Route.post('register', 'ClientsAuthController.register').as('register')

    Route.group(() => {
      Route.get('check', 'ClientsAuthController.check').as('check')
      Route.post('logout', 'ClientsAuthController.logout').as('logout')
      Route.post('update', 'ClientsAuthController.update').as('update')
    }).middleware('auth:client')
  })
    .prefix('auth')
    .as('auth')

  Route.group(() => {
    Route.resource('clients', 'ClientsController').apiOnly().only(['index', 'show'])

    Route.group(() => {
      Route.post('initialize', 'SubscriptionsController.initialize').as('initialize')
    })
      .prefix('subscriptions')
      .as('subscriptions')
  }).middleware('auth:client')
})
  .prefix('v1/client')
  .as('v1.client')
  .namespace('App/Controllers/Http')
