import Client from 'App/Models/Client'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Client, ({ faker }) => {
  const firstName = faker.name.firstName()
  const middleName = faker.name.middleName()
  const lastName = faker.name.lastName()

  return {
    email: faker.internet.email(firstName, lastName),
    firstName,
    middleName,
    lastName,
    password: 'password',
    phone: faker.phone.number('+63906#######'),
  }
}).build()
