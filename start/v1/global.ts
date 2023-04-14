import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('subscription-products', 'SubscriptionProductsController')
    .apiOnly()
    .only(['index', 'show'])

  Route.group(() => {
    Route.resource('workout-library', 'WorkoutLibrariesController')
      .apiOnly()
      .only(['index', 'show'])
    Route.resource('file-upload', 'FileUploadsController').apiOnly().only(['store'])
  }).middleware('auth')
})
  .prefix('v1/global')
  .as('v1.global')
  .namespace('App/Controllers/Http')
