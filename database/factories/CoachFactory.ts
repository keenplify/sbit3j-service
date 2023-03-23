import Factory from '@ioc:Adonis/Lucid/Factory'
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
  }
}).build()
