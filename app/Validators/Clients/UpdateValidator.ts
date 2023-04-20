import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { WorkoutLevels } from 'App/Enums/WorkoutLevels'
import { WorkoutPreferences } from 'App/Enums/WorkoutPreferences'
import { Genders } from 'App/Enums/GenderEnum'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstName: schema.string.optional(),
    middleName: schema.string.optional(),
    lastName: schema.string.optional(),
    phone: schema.string.optional([rules.unique({ table: 'clients', column: 'phone' })]),
    age: schema.number.optional(),
    weight: schema.number.optional(),
    height: schema.number.optional(),
    workoutLevel: schema.enum.optional(WorkoutLevels),
    workoutPreference: schema.enum.optional(WorkoutPreferences),
    availability: schema.string.optional(),
    coachGenderPreference: schema.enum.optional(Genders),
    goal: schema.string.optional(),
    notes: schema.string.optional(),
    line1: schema.string.optional({ trim: true }),
    line2: schema.string.optional({ trim: true }),
    city: schema.string.optional({ trim: true }),
    state: schema.string.optional({ trim: true }),
    postalCode: schema.string.optional({ trim: true }),
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
