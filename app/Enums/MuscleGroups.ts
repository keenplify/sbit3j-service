export const MuscleGroups = ['Chest', 'Back', 'Arms', 'Abdominals', 'Legs', 'Shoulders'] as const

export type MuscleGroup = (typeof MuscleGroups)[number]
