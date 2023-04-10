import { schema } from '@ioc:Adonis/Core/Validator'

export const WorkoutLibraryIndexSchema = schema.create({
  page: schema.number.optional(),
  keyword: schema.string.optional(),
})
