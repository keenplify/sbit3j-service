import Authenticatable from 'App/Core/Models/Authenticatable'
import { column } from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends Authenticatable {
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
