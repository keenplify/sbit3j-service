import { DateTime } from 'luxon'
import {
  afterDelete,
  afterSave,
  BaseModel,
  column,
  LucidModel,
  ModelAttributes,
} from '@ioc:Adonis/Lucid/Orm'
import Event from '@ioc:Adonis/Core/Event'

export default class Model extends BaseModel {
  constructor(data?: any) {
    super()
    this.merge(data)
  }

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static make<T extends LucidModel>(
    this: T,
    data?: Partial<ModelAttributes<InstanceType<T>>>
  ): InstanceType<T> {
    return new (this as any)(data)
  }

  public static makeMany<T extends LucidModel>(
    this: T,
    data: Partial<ModelAttributes<InstanceType<T>>>[]
  ): InstanceType<T>[] {
    return data.map((item) => new (this as any)(item))
  }

  @afterSave()
  public static fireAfterSaveEvent(model: Model) {
    Event.emit('model:saved', model)
  }

  @afterDelete()
  public static fireAfterDeleteEvent(model: Model) {
    Event.emit('model:deleted', model)
  }
}
