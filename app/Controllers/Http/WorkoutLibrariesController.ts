import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkoutLibrary from 'App/Models/WorkoutLibrary'
import { WorkoutResource } from 'App/Resources/WorkoutResource'
import { WorkoutLibraryIndexSchema } from 'App/Validators/WorkoutLibraries/IndexValidator'
import { WorkoutLibraryStoreSchema } from 'App/Validators/WorkoutLibraries/StoreValidator'
import { WorkoutLibraryUpdateSchema } from 'App/Validators/WorkoutLibraries/UpdateValidator'
import fetch, { Headers } from 'node-fetch'
import Env from '@ioc:Adonis/Core/Env'
import { ExerciseDBResponseData } from 'App/Interfaces/ExcerciseDB'
import Logger from '@ioc:Adonis/Core/Logger'
import { toTitleCase } from 'App/Helpers/StringHelpers'
import ExerciseDbScrape from 'App/Models/ExerciseDbScrape'

export default class WorkoutLibrariesController {
  public async index({ request, response }: HttpContextContract) {
    const { keyword, page = 1 } = await request.validate({
      schema: WorkoutLibraryIndexSchema,
      data: request.qs(),
    })

    const libraryQuery = WorkoutLibrary.query()

    if (keyword !== undefined && keyword.length > 0) {
      libraryQuery
        .where('title', 'like', `%${keyword}%`)
        .orWhere((query) => query.where('description', 'like', `%${keyword}%`))

      await this.scrapeExerciseDB(keyword)
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
    const { muscleGroups, ...payload } = await request.validate({
      schema: WorkoutLibraryStoreSchema,
    })

    // Create a new workout library from the validated request body
    const library = new WorkoutLibrary()
    library.merge(payload)
    library.muscleGroups = muscleGroups
    await library.save()

    const resource = WorkoutResource.make(library)

    return response.resource(resource)
  }

  public async update({ params, request, response }: HttpContextContract) {
    // Retrieve the workout library by id
    const library = await WorkoutLibrary.findOrFail(params.id)

    // Validate the request body
    const { muscleGroups, ...payload } = await request.validate({
      schema: WorkoutLibraryUpdateSchema,
    })

    // Update the workout library with the validated request body
    library.merge(payload)

    if (muscleGroups !== undefined) {
      library.muscleGroups = muscleGroups
    }

    await library.save()

    const resource = WorkoutResource.make(library)

    return response.resource(resource)
  }

  public async scrapeExerciseDB(keyword: string) {
    const scraped = await ExerciseDbScrape.query()
      .where('keyword', keyword.toLocaleLowerCase())
      .first()
    if (scraped) return []

    await ExerciseDbScrape.create({
      keyword: keyword.toLocaleLowerCase(),
    })

    const headers = new Headers()
    headers.append('X-RapidAPI-Key', Env.get('EXCERCISE_DB_RAPID_API_KEY'))
    headers.append('X-RapidAPI-Host', Env.get('EXCERCISE_DB_RAPID_API_HOST'))

    try {
      const response = await fetch(
        `https://${Env.get('EXCERCISE_DB_RAPID_API_HOST')}/exercises/name/${encodeURIComponent(
          keyword
        )}`,
        {
          method: 'get',
          headers,
        }
      )

      const data = (await response.json()) as ExerciseDBResponseData

      const newExercises = await WorkoutLibrary.fetchOrCreateMany(
        'exerciseDbScrapeId',
        data.map((exercise) => ({
          title: toTitleCase(exercise.name),
          description: `This exercise will use ${exercise.equipment} and will target ${exercise.target}.`,
          reps: 8,
          sets: 5,
          time: 15,
          imageUrl: exercise.gifUrl,
          muscleGroupsJson: JSON.stringify([exercise.bodyPart]),
          exerciseDbScrapeId: exercise.id,
        }))
      )

      return newExercises
    } catch (error) {
      Logger.warn(error, 'Unable to scrape')
      return []
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const workout = await WorkoutLibrary.findOrFail(params.id)

    await workout.delete()

    return response.noContent()
  }
}
