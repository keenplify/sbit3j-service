import SessionWorkout from 'App/Models/SessionWorkout'
import Factory from '@ioc:Adonis/Lucid/Factory'
import SessionFactory from 'Database/factories/SessionFactory'

export default Factory.define(SessionWorkout, ({ faker }) => {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    reps: faker.datatype.number(),
    sets: faker.datatype.number(),
    time: faker.datatype.number(),
    imageUrl: faker.image.sports(),
    youtubeUrl: 'https://www.youtube.com/watch?v=0Z_osVD6rVI',
    isDone: faker.datatype.boolean(),
  }
})
  .relation('session', () => SessionFactory)
  .build()
