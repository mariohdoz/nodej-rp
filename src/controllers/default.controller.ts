import { Request, Response } from 'express'
import { route, GET } from 'awilix-express'
import { TestService } from '../services/test.service'

@route('/api/v1')
export class DefaultController {

  constructor(private readonly testService: TestService) {}

  @GET()
  public index(req: Request, res: Response): void {
    res.status(200).send({
      message: 'Hello from api'
    })
  }
}