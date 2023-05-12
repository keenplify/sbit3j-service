import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'CoachesAuthController.login').as('login')
    Route.post('register', 'CoachesAuthController.register').as('register')

    Route.group(() => {
      Route.get('check', 'CoachesAuthController.check').as('check')
      Route.post('logout', 'CoachesAuthController.logout').as('logout')
      Route.post('update', 'CoachesAuthController.update').as('update')
    }).middleware('auth:coach')
  })
    .prefix('auth')
    .as('auth')

  Route.group(() => {
    Route.resource('clients', 'ClientsController').apiOnly().only(['index', 'show'])
    Route.resource('coaches', 'CoachesController').apiOnly().only(['index', 'show', 'update'])
    Route.resource('workout-libraries', 'WorkoutLibrariesController')
      .apiOnly()
      .only(['index', 'show'])
    Route.resource('social-medias', 'SocialMediasController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store', 'update'])
    Route.resource('sessions', 'SessionsController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store', 'update'])
    Route.resource('coachings', 'CoachingsController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store'])
    Route.resource('session-workouts', 'SessionWorkoutsController')
      .apiOnly()
      .only(['show', 'store', 'update', 'destroy'])
  }).middleware('auth:coach')
})
  .prefix('v1/coach')
  .as('v1.coach')
  .namespace('App/Controllers/Http')
