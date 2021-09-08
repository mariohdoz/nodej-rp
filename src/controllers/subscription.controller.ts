import { Request, Response } from 'express'
import { route, GET, POST, PUT, DELETE } from 'awilix-express'
import { SubscriptionService } from '../services/subscription.service'
import { SubscriptionCreateDto, SubscriptionUpdate } from '../dtos/subscription.dto'
import { BaseController } from '../common/controllers/base.controller'

@route('/api/v1/subscriptions')
export class SubscriptionController extends BaseController {

  constructor(private readonly subscriptionService: SubscriptionService) {
    super()
  }

  @GET()
  public async index(req: Request, res: Response): Promise<void> {
    try {
      const subscriptions = await this.subscriptionService.all()
      res.status(200).send(subscriptions)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      const subscription = await this.subscriptionService.find(id)

      if(subscription){
        res.status(200).send(subscription)
      }else {
        res.status(404).send({message: 'Subscription not found'})
      }

    } catch (error) {
      this.handleException(error, res)
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<void> {
    try {
      const { amount, code, cron, user_id } = req.body
      await this.subscriptionService.store({
        amount,
        code,
        cron,
        user_id
      } as SubscriptionCreateDto)

      res.status(201).send({
        message: 'Subscription inserted'
      })
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { amount, code, cron } = req.body
      const id = parseInt(req.params.id)

      await this.subscriptionService.update(id, {
        amount,
        code,
        cron,
      } as SubscriptionUpdate)

      res.status(204).send({
        message: 'Subscription updated'
      })
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @route('/:id')
  @DELETE()
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id)
      await this.subscriptionService.delete(id)
      res.status(200).send({ message: 'Subscription deleted' })
    } catch (error) {
      this.handleException(error, res)
    }
  }

}