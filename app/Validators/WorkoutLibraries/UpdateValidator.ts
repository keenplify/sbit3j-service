import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const WorkoutLibraryUpdateSchema = schema.create({
  name: schema.string.optional({ trim: true }, [
    rules.maxLength(255),
    rules.unique({ table: 'workout_libraries', column: 'name' }),
  ]),
  description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
})
