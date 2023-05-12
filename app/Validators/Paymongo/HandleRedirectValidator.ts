import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const HandleRedirectValidatorSchema = schema.create({
  payment_intent_id: schema.string.optional(),
  final_url: schema.string.optional({ trim: true }, [rules.url()]),
})
