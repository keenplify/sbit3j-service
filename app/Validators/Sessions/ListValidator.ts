import { schema } from '@ioc:Adonis/Core/Validator'

export const SessionListSchema = schema.create({
  clientId: schema.string.optional(),
  coachId: schema.string.optional(),
})
