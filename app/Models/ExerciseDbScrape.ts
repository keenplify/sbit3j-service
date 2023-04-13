import { column } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'

export default class ExerciseDbScrape extends Model {
  @column()
  public keyword: string
}
