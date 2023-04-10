export const WorkoutLevels = ['Beginner', 'Intermediate ', 'Advanced Workout'] as const

export type WorkoutLevel = (typeof WorkoutLevels)[number]
