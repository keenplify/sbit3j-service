import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ImageUploadValidator from 'App/Validators/FileUploads/ImageUploadValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import { Exception } from '@adonisjs/core/build/standalone'

export default class FileUploadsController {
  public async store({ request, response }: HttpContextContract) {
    const { file } = await request.validate(ImageUploadValidator)

    await file.moveToDisk('./')

    if (!file.filePath || !file.fileName) {
      throw new Exception('File path is missing.')
    }

    const pictureUrl = await Drive.getUrl(file.fileName)

    return response.status(201).json({
      data: {
        url: pictureUrl,
        path: file.fileName,
      },
    })
  }
}
