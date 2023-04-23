import SocialMedia from 'App/Models/SocialMedia'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { SocialMediaTitles } from 'App/Enums/SocialMediaTitles'

export default Factory.define(SocialMedia, ({ faker }) => {
  const title = faker.helpers.arrayElement(SocialMediaTitles)

  return {
    link: faker.internet.url(),
    name: title,
    title,
  }
}).build()
