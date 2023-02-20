import Model from 'App/Core/Models/Model'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import { SocialMediaTitle } from 'App/Enums/SocialMediaTitles'

export default class SocialMedia extends Model {
  @column()
  public clientId?: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @column()
  public coachId?: number

  @belongsTo(() => Coach)
  public coach: BelongsTo<typeof Coach>

  @column()
  public link: string

  @column()
  public title: SocialMediaTitle

  @column()
  public name: string
}
