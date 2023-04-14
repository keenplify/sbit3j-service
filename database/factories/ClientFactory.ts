import Client from 'App/Models/Client'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { Genders } from 'App/Enums/GenderEnum'
import { WorkoutLevels } from 'App/Enums/WorkoutLevels'
import { WorkoutPreferences } from 'App/Enums/WorkoutPreferences'

export default Factory.define(Client, ({ faker }) => {
  const firstName = faker.name.firstName()
  const middleName = faker.name.middleName()
  const lastName = faker.name.lastName()

  return {
    email: faker.internet.email(firstName, lastName).toLowerCase(),
    firstName,
    middleName,
    lastName,
    password: 'password',
    phone: faker.phone.number('+639#########'),
    gender: faker.helpers.arrayElement(Genders),
    requiresCoaching: true,
    age: faker.datatype.number(),
    weight: faker.datatype.number(),
    height: faker.datatype.number(),
    workoutLevel: faker.helpers.arrayElement(WorkoutLevels),
    workoutPreference: faker.helpers.arrayElement(WorkoutPreferences),
    availability: faker.lorem.lines(),
    coachGenderPreference: faker.helpers.arrayElement(Genders),
    goal: faker.lorem.lines(),
    notes: faker.lorem.lines(),
    line1: faker.address.streetAddress(),
    line2: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    postalCode: faker.address.zipCode(),
  }
}).build()
