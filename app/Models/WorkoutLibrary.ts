import Model from 'App/Core/Models/Model'
import { column } from '@ioc:Adonis/Lucid/Orm'
import { MuscleGroup, MuscleGroups } from 'App/Enums/MuscleGroups'
import { z } from 'zod'

const MuscleGroupSchema = z.array(z.enum(MuscleGroups))
export default class WorkoutLibrary extends Model {
  @column()
  public title: string

  @column()
  public description: string

  @column()
  public reps: number

  @column()
  public sets: number

  /** In seconds */
  @column()
  public time: number

  @column()
  public imageUrl?: string

  @column()
  public youtubeUrl?: string

  @column()
  public muscleGroupsJson: string

  @column()
  public exerciseDbScrapeId?: string

  public set muscleGroups(groups: MuscleGroup[]) {
    const data = MuscleGroupSchema.parse(groups)
    this.muscleGroupsJson = JSON.stringify(data)
  }

  public get muscleGroups() {
    if (typeof this.muscleGroupsJson === 'object') return this.muscleGroupsJson as MuscleGroup[]
    else if (typeof this.muscleGroupsJson === 'string') {
      const data = MuscleGroupSchema.parse(JSON.parse(this.muscleGroupsJson))
      return data
    } else {
      return []
    }
  }
}
