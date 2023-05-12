import { ExerciseDBBodyParts } from 'App/Enums/ExerciseDBBodyParts'

export const MuscleGroups = ExerciseDBBodyParts

export type MuscleGroup = (typeof MuscleGroups)[number]
