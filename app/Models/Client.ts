import Authenticatable from 'App/Core/Models/Authenticatable'
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Subscription from 'App/Models/Subscription'
import SocialMedia from 'App/Models/SocialMedia'
import { DateTime } from 'luxon'
import Session from 'App/Models/Session'
import { WorkoutLevel } from 'App/Enums/WorkoutLevels'
import { WorkoutPreference } from 'App/Enums/WorkoutPreferences'
import { Gender } from 'App/Enums/GenderEnum'

export default class Client extends Authenticatable {
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
  public gender: Gender

  @column()
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
