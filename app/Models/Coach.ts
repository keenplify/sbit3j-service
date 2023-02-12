import { column } from '@ioc:Adonis/Lucid/Orm'
import Authenticatable from 'App/Core/Models/Authenticatable'

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
}
