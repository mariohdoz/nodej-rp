import express from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'

//Repositories
import { SubscriptionMysqlRepository } from '../services/repositories/impl/mysql/subcription.mysql.respository.impl'
import { BalanceMysqlRepository } from '../services/repositories/impl/mysql/balance.mysql.repository'
import { MovementMysqlRepository } from '../services/repositories/impl/mysql/movement.mysql.repository'
// import { SubscriptionMssqlRepository } from '../services/repositories/impl/mssql/subcription.mssql.respository.impl'
// import { BalanceMssqlRepository } from '../services/repositories/impl/mssql/balance.mssql.repository'
// import { MovementMssqlRepository } from '../services/repositories/impl/mssql/movement.mssql.repository'

// Services
import { TestService } from '../services/test.service'
import { SubscriptionService } from '../services/subscription.service'
import { MovementService } from '../services/movement.service'

export default (app: express.Application): void => {
  const container = createContainer({
    injectionMode: 'CLASSIC'
  })

  container.register({
    //Repositories 
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),
    balanceRepository: asClass(BalanceMysqlRepository).scoped(),
    movementRepository: asClass(MovementMysqlRepository).scoped(),
    // subscriptionRepository: asClass(SubscriptionMssqlRepository).scoped(),
    // balanceRepository: asClass(BalanceMssqlRepository).scoped(),
    // movementRepository: asClass(MovementMssqlRepository).scoped(),

    //Services
    subscriptionService: asClass(SubscriptionService).scoped(),
    movementService: asClass(MovementService).scoped(),
    testService: asClass(TestService).scoped()
  })

  app.use(scopePerRequest(container))
}