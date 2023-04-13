import Factory from '@ioc:Adonis/Lucid/Factory'
import { Genders } from 'App/Enums/GenderEnum'
import Coach from 'App/Models/Coach'

export default Factory.define(Coach, ({ faker }) => {
  const firstName = faker.name.firstName()
  const middleName = faker.name.middleName()
  const lastName = faker.name.lastName()

  return {
    email: faker.internet.email(firstName, lastName).toLowerCase(),
    firstName,
    middleName,
    lastName,
    password: 'password',
    phone: faker.phone.number('+63906#######'),
    gender: faker.helpers.arrayElement(Genders),
  }
}).build()
