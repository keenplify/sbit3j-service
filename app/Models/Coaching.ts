import { BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'
import { column } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'

export default class Coaching extends Model {
  @column()
  public clientId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public coachId: number

  @belongsTo(() => Coach)
  public coach: BelongsTo<typeof Coach>
}
