import WorkoutLibrary from 'App/Models/WorkoutLibrary'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { MuscleGroups } from 'App/Enums/MuscleGroups'

export default Factory.define(WorkoutLibrary, ({ faker }) => {
  return {
    description: faker.commerce.productDescription(),
    title: faker.commerce.productName(),
    muscleGroupsJson: JSON.stringify(faker.helpers.arrayElements(MuscleGroups)),
    reps: faker.datatype.number({ min: 6, max: 16 }),
    sets: faker.datatype.number({ min: 3, max: 5 }),
    time: faker.datatype.number({ min: 60, max: 120 }),
    imageUrl: faker.image.sports(),
    videoUrl: 'https://www.youtube.com/watch?v=0Z_osVD6rVI',
  }
}).build()
