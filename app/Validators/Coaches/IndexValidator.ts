import { schema } from '@ioc:Adonis/Core/Validator'

export const CoachesIndexSchema = schema.create({
  keyword: schema.string.optional(),
})
