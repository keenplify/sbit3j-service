import Coaching from 'App/Models/Coaching'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ClientFactory from 'Database/factories/ClientFactory'
import CoachFactory from 'Database/factories/CoachFactory'

export default Factory.define(Coaching, () => {
  return {}
})
  .relation('client', () => ClientFactory)
  .relation('coach', () => CoachFactory)
  .build()
