import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('subscription-products', 'SubscriptionProductsController')
    .apiOnly()
    .only(['index'])
})
  .prefix('v1/global')
  .as('v1.global')
  .namespace('App/Controllers/Http')
