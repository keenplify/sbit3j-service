import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    price: schema.number([rules.unsigned()]),
  })

  public messages = {
    'name.required': 'The name field is required.',
    'description.required': 'The description field is required.',
    'price.required': 'The price field is required.',
    'price.unsigned': 'The price field should be a positive number.',
  }
}