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
    Route.resource('clients', 'ClientsController').apiOnly().only(['index', 'show', 'update'])
    Route.resource('coachings', 'CoachingsController').apiOnly().only(['index'])
    Route.resource('sessions', 'SessionsController').apiOnly().only(['index', 'show', 'update'])
    Route.resource('session-workouts', 'SessionWorkoutsController')
      .apiOnly()
      .only(['show', 'store', 'update', 'destroy'])
    Route.resource('workout-libraries', 'WorkoutLibrariesController')
      .apiOnly()
      .only(['index', 'show'])

    Route.group(() => {
      Route.post('initialize', 'SubscriptionsController.initialize').as('initialize')
      Route.get('current', 'SubscriptionsController.current').as('current')
    })
      .prefix('subscriptions')
      .as('subscriptions')

    Route.resource('subscriptions', 'SubscriptionsController').apiOnly().only(['index'])

    Route.resource('social-medias', 'SocialMediasController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store', 'update'])

    Route.group(() => {
      Route.post('/:id/reset', 'SessionsController.reset').as('reset')
    })
      .prefix('sessions')
      .as('sessions')
  }).middleware('auth:client')
})
  .prefix('v1/client')
  .as('v1.client')
  .namespace('App/Controllers/Http')
