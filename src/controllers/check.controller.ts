import { Request, Response } from 'express'
import { route, GET } from 'awilix-express'
import { TestService } from '../services/test.service'
import config from '../server/config'

@route('/check')
export class DefaultController {

  constructor(private readonly testService: TestService) { }

  @GET()
  public index(req: Request, res: Response): void {
    res.status(200).send({
      NODE_ENV: config.NODE_ENV
    })
  }

  @route('/test')
  @GET()
  public test(req: Request, res: Response): void {
    res.status(200).send(this.testService.get())
  }
}