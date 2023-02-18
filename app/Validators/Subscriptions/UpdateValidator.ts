import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    description: schema.string.optional({ trim: true }),
    price: schema.number.optional([rules.unsigned()]),
  })

  public messages = {
    'price.unsigned': 'The price field should be a positive number.',
  }
}