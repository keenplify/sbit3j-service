export const ExerciseDBBodyParts = [
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
] as const

export type ExerciseDBBodyPart = (typeof ExerciseDBBodyParts)[number]
