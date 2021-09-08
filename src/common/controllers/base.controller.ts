import { Response } from 'express'
import { ApplicationException } from '../exceptions/application.exceptions'
export abstract class BaseController {
  handleException(err: any, res: Response): void {
    if(err instanceof ApplicationException){
      res.status(400).send({ message: err.message, stack: err.stack})
    }else {
      throw new Error(err)
    }
  }
}