import Authenticatable from 'App/Core/Models/Authenticatable'
import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Subscription from 'App/Models/Subscription'

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

  public async activeSubscription(): Promise<Subscription> {
    throw 'TODO: Not yet implemented'
  }
}
