import { ExerciseDBBodyPart } from 'App/Enums/ExerciseDBBodyParts'
import { ExerciseDBEquipmentType } from 'App/Enums/ExerciseDBEquipmentTypes'
import { ExerciseDBTarget } from 'App/Enums/ExerciseDBTargets'

export interface ExerciseDBExercise {
  bodyPart: ExerciseDBBodyPart
  equipment: ExerciseDBEquipmentType
  gifUrl: string
  id: string
  name: string
  target: ExerciseDBTarget
}

export type ExerciseDBResponseData = ExerciseDBExercise[]
