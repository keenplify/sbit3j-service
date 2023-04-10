import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkoutLibrary from 'App/Models/WorkoutLibrary'
import { workoutLibrarySchema } from 'App/Validators/WorkoutLibraries/WorkoutLibraryValidator'

export default class WorkoutLibrariesController {
  public async store({ request }: HttpContextContract) {
    // Validate the request body
    const payload = await request.validate({ schema: workoutLibrarySchema })

    // Create a new workout library from the validated request body
    const library = new WorkoutLibrary()
    library.name = payload.name
    library.description = payload.description
    await library.save()

    return library
  }

  public async update({ params, request }: HttpContextContract) {
    // Retrieve the workout library by id
    const library = await WorkoutLibrary.findOrFail(params.id)

    // Validate the request body
    const payload = await request.validate({ schema: workoutLibrarySchema })

    // Update the workout library with the validated request body
    library.name = payload.name
    library.description = payload.description
    await library.save()

    return library
  }
}

