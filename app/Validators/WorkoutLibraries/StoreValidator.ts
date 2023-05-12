import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { MuscleGroups } from 'App/Enums/MuscleGroups'

export const WorkoutLibraryStoreSchema = schema.create({
  title: schema.string({ trim: true }, [rules.maxLength(255)]),
  description: schema.string({ trim: true }, [rules.maxLength(255)]),
  muscleGroups: schema.array().members(schema.enum(MuscleGroups)),
  reps: schema.number(),
  sets: schema.number(),
  time: schema.number(),
  imageUrl: schema.string(),
  youtubeUrl: schema.string.optional(),
})
