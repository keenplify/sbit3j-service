import Model from 'App/Core/Models/Model'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Client from 'App/Models/Client'

export default class Subscription extends Model {
  @column.dateTime()
  public startAt?: DateTime

  @column.dateTime()
  public endAt?: DateTime

  @column()
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>
}
