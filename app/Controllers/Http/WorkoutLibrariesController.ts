import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkoutLibrary from 'App/Models/WorkoutLibrary'
import { WorkoutResource } from 'App/Resources/WorkoutResource'
import { WorkoutLibraryIndexSchema } from 'App/Validators/WorkoutLibraries/IndexValidator'
import { WorkoutLibraryStoreSchema } from 'App/Validators/WorkoutLibraries/StoreValidator'
import { WorkoutLibraryUpdateSchema } from 'App/Validators/WorkoutLibraries/UpdateValidator'

export default class WorkoutLibrariesController {
  public async index({ request, response }: HttpContextContract) {
    const { keyword, page = 1 } = await request.validate({
      schema: WorkoutLibraryIndexSchema,
      data: request.qs,
    })

    const libraryQuery = WorkoutLibrary.query()

    if (keyword !== undefined) {
      libraryQuery
        .where('title', 'like', `%${keyword}%`)
        .orWhere((query) => query.where('description', 'like', `%${keyword}%`))
    }

    const library = await libraryQuery.paginate(page, 5)

    const resource = WorkoutResource.pagination(library)

    return response.resource(resource)
  }

  public async show({ params, response }: HttpContextContract) {
    const workout = await WorkoutLibrary.query().where('id', params.id).firstOrFail()

    const resource = WorkoutResource.make(workout)

    return response.resource(resource)
  }

  public async store({ request, response }: HttpContextContract) {
    // Validate the request body
    const payload = await request.validate({ schema: WorkoutLibraryStoreSchema })

    // Create a new workout library from the validated request body
    const library = new WorkoutLibrary()
    library.name = payload.name
    library.description = payload.description
    await library.save()

    const resource = WorkoutResource.make(library)

    return response.resource(resource)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Retrieve the workout library by id
    const library = await WorkoutLibrary.findOrFail(params.id)

    // Validate the request body
    const payload = await request.validate({ schema: WorkoutLibraryUpdateSchema })

    // Update the workout library with the validated request body
    library.merge(payload)

    await library.save()

    const resource = WorkoutResource.make(library)

    return response.resource(resource)
  }
}
