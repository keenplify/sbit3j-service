export const Currencies = ['PHP'] as const

export type Currency = (typeof Currencies)[number]
