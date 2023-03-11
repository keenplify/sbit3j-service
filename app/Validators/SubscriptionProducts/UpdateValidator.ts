import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  public schema = schema.create({
    title: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
    price: schema.string.optional(),
    duration: schema.string(),
  })

  public messages = {
    'price.unsigned': 'The price field should be a positive number.',
  }
}
