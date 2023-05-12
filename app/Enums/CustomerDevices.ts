export const CustomerDevices = ['phone', 'email'] as const

export type CustomerDevice = (typeof CustomerDevices)[number]
