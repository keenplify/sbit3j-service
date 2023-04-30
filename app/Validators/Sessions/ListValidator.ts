import { schema } from '@ioc:Adonis/Core/Validator'

export const SessionListSchema = schema.create({
  clientId: schema.number.optional(),
  coachId: schema.number.optional(),
})
