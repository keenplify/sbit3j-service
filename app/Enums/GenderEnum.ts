export const Genders = ['Male', 'Female'] as const

export type Gender = (typeof Genders)[number]
