import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('webhook', 'PaymongoController.webhook').as('webhook')
  Route.get('handle-redirect', 'PaymongoController.handleRedirect').as('handle-redirect')
})
  .prefix('v1/paymongo')
  .as('v1.paymongo')
  .namespace('App/Controllers/Http')
