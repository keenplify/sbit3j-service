import Authenticatable from 'App/Core/Models/Authenticatable'
import { column, hasMany, HasMany, scope } from '@ioc:Adonis/Lucid/Orm'
import Subscription from 'App/Models/Subscription'
import SocialMedia from 'App/Models/SocialMedia'
import { DateTime } from 'luxon'
import Session from 'App/Models/Session'
import { WorkoutLevel } from 'App/Enums/WorkoutLevels'
import { WorkoutPreference } from 'App/Enums/WorkoutPreferences'
import { Gender } from 'App/Enums/GenderEnum'
import Coaching from 'App/Models/Coaching'

export default class Client extends Authenticatable {
  public static currentYear = scope((query) => {
    const currentYear = new Date().getFullYear()
    query.whereRaw(`YEAR(created_at) = ${currentYear}`)
  })

  @column()
  public firstName: string

  @column()
  public middleName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public line1: string

  @column()
  public line2: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public postalCode: string

  @column()
  public gender: Gender

  @column({
    consume: (value) => Boolean(value),
  })
  public requiresCoaching?: boolean | null

  @column()
  public age?: number | null

  @column()
  public weight?: number | null

  @column()
  public height?: number | null

  @column()
  public workoutLevel?: WorkoutLevel | null

  @column()
  public workoutPreference?: WorkoutPreference | null

  @column()
  public availability?: string | null

  @column()
  public coachGenderPreference?: Gender | null

  @column()
  public goal?: string

  @column()
  public notes?: string

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => SocialMedia)
  public socialMedias: HasMany<typeof SocialMedia>

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  @hasMany(() => Coaching)
  public coachings: HasMany<typeof Coaching>

  public async activeSubscription(): Promise<Subscription | null> {
    const today = DateTime.now()
    const subscription = await Subscription.query()
      .whereNotNull('payment_received')
      .where('client_id', this.id)
      .where('start_at', '<=', today.startOf('day').toISO())
      .where('end_at', '>=', today.endOf('day').toISO())
      .first()

    return subscription
  }
}
