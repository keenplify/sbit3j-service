import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ManualSubscribeValidator {
  public schema = schema.create({
    startAt: schema.date(),
    subscriptionProductId: schema.number([
      rules.exists({ table: 'subscription_products', column: 'id' }),
    ]),
    clientId: schema.number([
      rules.exists({
        table: 'clients',
        column: 'id',
      }),
    ]),
  })

  public messages = {
    'name.required': 'The name field is required.',
    'description.required': 'The description field is required.',
    'price.required': 'The price field is required.',
    'price.unsigned': 'The price field should be a positive number.',
  }
}
