import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Model from 'App/Core/Models/Model'

export default class Authenticatable extends Model {
  @column()
  public password: string

  @beforeSave()
  public static async hashPassword(model: any) {
    if (model.$dirty.password) {
      model.password = await Hash.make(model.password)
    }
  }
}
