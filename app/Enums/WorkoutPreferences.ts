export const WorkoutPreferences = ['Core', 'Upper', 'Lower Body'] as const

export type WorkoutPreference = (typeof WorkoutPreferences)[number]
