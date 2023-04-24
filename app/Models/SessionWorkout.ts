import { BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'
import Session from 'App/Models/Session'
import { column } from '@ioc:Adonis/Lucid/Orm'

export default class SessionWorkout extends Model {
  @column()
  public title: string

  @column()
  public description?: string

  @column()
  public reps?: number

  @column()
  public sets?: number

  /** In seconds */
  @column()
  public time?: number

  @column()
  public imageUrl?: string

  @column()
  public youtubeUrl?: string

  @column({ serialize: Boolean })
  public isDone: boolean

  @column()
  public sessionId: number

  @belongsTo(() => Session)
  public session: BelongsTo<typeof Session>
}
