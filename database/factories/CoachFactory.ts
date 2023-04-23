import Factory from '@ioc:Adonis/Lucid/Factory'
import { Genders } from 'App/Enums/GenderEnum'
import Coach from 'App/Models/Coach'
import CoachingFactory from 'Database/factories/CoachingFactory'
import SessionFactory from 'Database/factories/SessionFactory'
import SocialMediaFactory from 'Database/factories/SocialMediaFactory'

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
})
  .relation('coachings', () => CoachingFactory)
  .relation('sessions', () => SessionFactory)
  .relation('socialMedias', () => SocialMediaFactory)
  .build()
