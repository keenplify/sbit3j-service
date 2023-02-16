import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import { BaseResource } from 'App/Core/Resources/BaseResource'
import Client from 'App/Models/Client'

export class ClientResource extends BaseResource {
  public toObject(model: Client): ModelObject {
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
