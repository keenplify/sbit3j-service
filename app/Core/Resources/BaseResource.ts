import { ModelObject, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Model from 'App/Core/Models/Model'
import { MissingValue } from './MissingValue'

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
export class BaseResource {
  protected resource?: ModelObject | MissingValue
  protected type: 'item' | 'collection' | 'pagination'
  protected extra: any = {}

  constructor(resource?: ModelObject, type?: 'item' | 'collection' | 'pagination') {
    this.resource = resource

    if (type) {
      this.type = type
    } else {
      this.type = Array.isArray(resource) ? 'collection' : 'item'
    }
  }

  public additional(data: any) {
    for (const key in data) {
      this.extra[key] = data[key]
    }

    return this
  }

  public isPaginated() {
    return this.type === 'pagination'
  }

  public getAdditional() {
    return this.extra
  }

  public hasAdditional() {
    return Object.keys(this.extra).length > 0
  }

  public static collection<T extends Model>(resources: T[] | MissingValue) {
    return new this(resources, 'collection')
  }

  public static make<T extends Model>(resource?: T | MissingValue) {
    return new this(resource, 'item')
  }

  public static pagination<T extends Model>(resources: ModelPaginatorContract<T>) {
    return new this(resources, 'pagination')
  }

  public toObject(_model: ModelObject): ModelObject {
    throw new Error('Method is not implemented')
  }

  public toJSON(): ModelObject | ModelObject[] | null | undefined {
    if (this.resource) {
      if (this.resource instanceof MissingValue) {
        return this.resource.toJSON()
      }

      if (this.type === 'item') {
        return this.toObject(this.resource)
      } else if (this.type === 'collection') {
        return Array.from(this.resource as ModelObject[]).map((item) => this.toObject(item))
      } else if (this.type === 'pagination') {
        const object = this.resource.toJSON()

        object.data = Array.from(object.data as any[]).map((item) => this.toObject(item))

        return object
      }
    }

    if (this.type === 'collection') {
      return []
    }

    return null
  }

  public whenLoaded<T>(value: T) {
    if (value) {
      return value
    }

    return new MissingValue()
  }
}
