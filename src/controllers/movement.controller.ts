import { Request, Response } from 'express'
import { route, GET, POST } from 'awilix-express'
import { MovementService } from '../services/movement.service'
import { MovementCreateDto } from '../dtos/movement.dto'
import { BaseController } from '../common/controllers/base.controller'

@route('/api/v1/movements')
export class MovementController extends BaseController {
  constructor(private readonly movementService: MovementService) {
    super()
  }

  @GET()
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const movement = await this.movementService.all()
      res.status(200).send(movement)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      const movement = await this.movementService.find(id)

      if (movement) {
        res.status(200).send(movement)
      } else {
        res.status(404).send({ message: 'Movement not found' })
      }

    } catch (error) {
      this.handleException(error, res)
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      const { amount, type, user_id } = req.body
      await this.movementService.store({
        type,
        amount,
        user_id
      } as MovementCreateDto)

      res.status(201).send({
        message: 'Movement inserted'
      })
    } catch (error) {
      this.handleException(error, res)
    }
  }
}