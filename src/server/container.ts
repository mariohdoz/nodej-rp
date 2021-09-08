import express from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'

//Repositories
import { SubscriptionMysqlRepository } from '../services/repositories/impl/mysql/subcription.mysql.respository.impl'
import { BalanceMysqlRepository } from '../services/repositories/impl/mysql/balance.mysql.repository'
import { MovementMysqlRepository } from '../services/repositories/impl/mysql/movement.mysql.repository'

// Services
import { TestService } from '../services/test.service'
import { SubscriptionService } from '../services/subscription.service'

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    //Repositories 
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),
    movementRepository: asClass(MovementMysqlRepository).scoped(),

    //Services
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped()
  })

  app.use(scopePerRequest(container))
}