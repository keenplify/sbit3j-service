import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AdminsAuthController.login').as('login')

    Route.group(() => {
      Route.get('check', 'AdminsAuthController.check').as('check')
      Route.post('logout', 'AdminsAuthController.logout').as('logout')
    }).middleware('auth:admin')
  })
    .prefix('auth')
    .as('auth')

  Route.group(() => {
    Route.resource('coachings', 'CoachingsController')
      .apiOnly()
      .only(['index', 'show', 'store', 'destroy'])
    Route.resource('workout-libraries', 'WorkoutLibrariesController')
      .apiOnly()
      .only(['index', 'show', 'store', 'update', 'destroy'])
    Route.resource('coaches', 'CoachesController')
      .apiOnly()
      .only(['index', 'show', 'update', 'store'])
    Route.resource('clients', 'ClientsController')
      .apiOnly()
      .only(['index', 'show', 'update', 'store'])
    Route.resource('admins', 'AdminsController')
      .apiOnly()
      .only(['index', 'show', 'store', 'update', 'destroy'])
    Route.resource('subscription-products', 'SubscriptionProductsController')
      .apiOnly()
      .only(['index', 'show', 'store', 'update', 'destroy'])
    Route.resource('coachings', 'CoachingsController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store'])
  }).middleware('auth:admin')
})
  .prefix('v1/admin')
  .as('v1.admin')
  .namespace('App/Controllers/Http')
