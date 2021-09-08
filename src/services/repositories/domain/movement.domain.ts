import { MovementType } from '../../../common/enums/movements.types'

export interface Movement {
  id: number
  user_id: number
  type: MovementType
  amount: number
  created_at: Date | null
  updated_at: Date | null
}