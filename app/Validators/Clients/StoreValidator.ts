import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Genders } from 'App/Enums/GenderEnum'
import { WorkoutLevels } from 'App/Enums/WorkoutLevels'
import { WorkoutPreferences } from 'App/Enums/WorkoutPreferences'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    middleName: schema.string.optional({ trim: true }),
    lastName: schema.string({ trim: true }),
    age: schema.number(),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.unique({ table: 'clients', column: 'email' }),
    ]),
    phone: schema.string({ trim: true }, [rules.unique({ table: 'clients', column: 'phone' })]),
    password: schema.string({ trim: true }),
    gender: schema.enum(Genders),
    line1: schema.string({ trim: true }),
    line2: schema.string({ trim: true }),
    city: schema.string({ trim: true }),
    state: schema.string({ trim: true }),
    postalCode: schema.string({ trim: true }),

    weight: schema.number.optional(),
    height: schema.number.optional(),
    workoutLevel: schema.enum.optional(WorkoutLevels),
    workoutPreference: schema.enum.optional(WorkoutPreferences),
    availability: schema.string.optional(),
    coachGenderPreference: schema.enum.optional(Genders),
    goal: schema.string.optional(),
    notes: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
