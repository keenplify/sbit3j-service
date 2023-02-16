export const PaymentStatuses = ['pending', 'failed', 'paid'] as const

export type PaymentStatus = (typeof PaymentStatuses)[number]
