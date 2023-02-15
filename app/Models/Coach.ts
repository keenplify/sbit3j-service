import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Authenticatable from 'App/Core/Models/Authenticatable'
import Subscription from 'App/Models/Subscription'

export default class Coach extends Authenticatable {
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
}
