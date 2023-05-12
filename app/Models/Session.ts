import Model from 'App/Core/Models/Model'
import { BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import SessionWorkout from 'App/Models/SessionWorkout'

export default class Session extends Model {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public clientId: number

  @column()
  public coachId: number

  @column()
  public calories?: number

  @column()
  public proteins?: number

  @column()
  public fats?: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Coach)
  public coach: BelongsTo<typeof Coach>

  @hasMany(() => SessionWorkout)
  public workouts: HasMany<typeof SessionWorkout>
}
