import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('coaches', 'CoachesController').apiOnly()
})
  .prefix('v1')
  .as('v1')
  .namespace('App/Controllers/Http')
