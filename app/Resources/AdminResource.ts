import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Admin from 'App/Models/Admin'

export class AdminResource extends BaseResource {
  public toObject(model: Admin): ModelObject {
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
