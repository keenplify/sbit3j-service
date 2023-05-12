import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { MuscleGroups } from 'App/Enums/MuscleGroups'

export const WorkoutLibraryUpdateSchema = schema.create({
  title: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
  description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
  muscleGroups: schema.array.optional().members(schema.enum(MuscleGroups)),
  reps: schema.number.optional(),
  sets: schema.number.optional(),
  time: schema.number.optional(),
  imageUrl: schema.string.optional(),
  youtubeUrl: schema.string.optional(),
})
