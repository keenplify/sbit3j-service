export const SocialMediaTitles = ['Facebook', 'Instagram', 'Youtube', 'Twitter'] as const

export type SocialMediaTitle = (typeof SocialMediaTitles)[number]
