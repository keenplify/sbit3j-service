import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    middleName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    age: schema.number(),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.unique({ table: 'clients', column: 'email' }),
    ]),
    phone: schema.string({ trim: true }, [rules.unique({ table: 'clients', column: 'phone' })]),
    password: schema.string({ trim: true }),
    line1: schema.string({ trim: true }),
    line2: schema.string({ trim: true }),
    city: schema.string({ trim: true }),
    state: schema.string({ trim: true }),
    postalCode: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
