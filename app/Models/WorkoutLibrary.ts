import Model from 'App/Core/Models/Model'
import { column } from '@ioc:Adonis/Lucid/Orm'
import { MuscleGroups } from 'App/Enums/MuscleGroups'
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

  @column()
  public time: number

  @column()
  public imageUrl?: string

  @column()
  public videoUrl?: string

  @column()
  public muscleGroupsJson: string

  public set muscleGroups(groups: string[]) {
    const data = MuscleGroupSchema.parse(groups)
    this.muscleGroupsJson = JSON.stringify(data)
  }

  public get muscleGroups() {
    const data = MuscleGroupSchema.parse(JSON.parse(this.muscleGroupsJson))
    return data
  }
}
