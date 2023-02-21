import Authenticatable from 'App/Core/Models/Authenticatable'
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Subscription from 'App/Models/Subscription'
import SocialMedia from 'App/Models/SocialMedia'
import { DateTime } from 'luxon'

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

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => SocialMedia)
  public socialMedias: HasMany<typeof SocialMedia>

  public async activeSubscription(): Promise<Subscription | null> {
    const today = DateTime.now().toISO()
    const subscription = await Subscription.query()
      .whereNotNull('payment_received')
      .where('client_id', this.id)
      .where('start_at', '<=', today)
      .where('end_at', '>=', today)
      .first()

    return subscription
  }
}
