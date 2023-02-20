import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import Coach from 'App/Models/Coach'
import { SocialMediaResource } from 'App/Resources/SocialMediaResource'
import SocialMediaStoreValidator from 'App/Validators/Global/SocialMedia/StoreValidator'
import SocialMediaUpdateValidator from 'App/Validators/Global/SocialMedia/UpdateValidator'

export default class SocialMediasController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.use().user! as Coach | Client

    const socialMedias = await user.related('socialMedias').query()

    const resource = SocialMediaResource.collection(socialMedias)

    return response.resource(resource)
  }

  public async show({ params, response, auth }: HttpContextContract) {
    const user = auth.use().user! as Coach | Client

    const socialMedia = await user
      .related('socialMedias')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const resource = SocialMediaResource.make(socialMedia)

    return response.resource(resource)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const user = auth.use().user! as Coach | Client

    const data = await request.validate(SocialMediaStoreValidator)

    const socialMedia = await user.related('socialMedias').create({
      link: data.link,
      name: data.name,
      title: data.title,
    })

    const resource = SocialMediaResource.make(socialMedia)

    return response.resource(resource)
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const user = auth.use().user! as Coach | Client

    const data = await request.validate(SocialMediaUpdateValidator)

    const socialMedia = await user
      .related('socialMedias')
      .query()
      .where('id', params.id)
      .firstOrFail()

    socialMedia.merge(data)

    await socialMedia.save()

    const resource = SocialMediaResource.make(socialMedia)

    return response.resource(resource)
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const user = auth.use().user! as Coach | Client

    const socialMedia = await user
      .related('socialMedias')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await socialMedia.delete()

    return response.noContent()
  }
}
