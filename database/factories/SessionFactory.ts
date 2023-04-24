import Session from 'App/Models/Session'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ClientFactory from 'Database/factories/ClientFactory'
import CoachFactory from 'Database/factories/CoachFactory'
import SessionWorkoutFactory from 'Database/factories/SessionWorkoutFactory'

export default Factory.define(Session, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraphs(1),
    calories: faker.datatype.number({
      min: 100,
      max: 300,
    }),
    proteins: faker.datatype.number({
      min: 5,
      max: 100,
    }),
    fats: faker.datatype.number({
      min: 5,
      max: 100,
    }),
  }
})
  .relation('client', () => ClientFactory)
  .relation('coach', () => CoachFactory)
  .relation('workouts', () => SessionWorkoutFactory)
  .build()
