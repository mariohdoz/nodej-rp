import { MovementType } from '../common/enums/movements.types'

interface MovementCreateDto {
  type: MovementType
  user_id: number
  amount: number
}

export {
  MovementCreateDto
}