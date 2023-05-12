import { schema } from '@ioc:Adonis/Core/Validator'

export const ClientsIndexSchema = schema.create({
  keyword: schema.string.optional(),
})
