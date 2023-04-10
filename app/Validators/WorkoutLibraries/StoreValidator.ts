import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const WorkoutLibraryStoreSchema = schema.create({
  name: schema.string({ trim: true }, [
    rules.maxLength(255),
    rules.unique({ table: 'workout_libraries', column: 'name' }),
  ]),
  description: schema.string({ trim: true }, [rules.maxLength(255)]),
})
