export const CaptureTypes = ['automatic', 'manual'] as const

export type CaptureType = (typeof CaptureTypes)[number]
