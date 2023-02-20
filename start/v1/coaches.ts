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
    Route.resource('coaches', 'CoachesController').apiOnly().only(['index', 'show'])
    Route.resource('social-medias', 'SocialMediasController')
      .apiOnly()
      .only(['index', 'show', 'destroy', 'store', 'update'])
  }).middleware('auth:coach')
})
  .prefix('v1/coach')
  .as('v1.coach')
  .namespace('App/Controllers/Http')
