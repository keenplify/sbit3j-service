import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Coach from 'App/Models/Coach'

export class CoachResource extends BaseResource {
  public toObject(model: Coach): ModelObject {
    return {
      id: model.id,
      firstName: model.firstName,
      middleName: model.middleName,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
