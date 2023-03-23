import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionWorkoutStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    sessionId: schema.number([
      rules.exists({
        column: 'id',
        table: 'sessions',
      }),
    ]),
    title: schema.string(),
    description: schema.string.optional(),
    reps: schema.number.optional(),
    sets: schema.number.optional(),
    time: schema.number.optional(),
    imageUrl: schema.string.optional(),
    youtubeUrl: schema.string.optional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {}
}
