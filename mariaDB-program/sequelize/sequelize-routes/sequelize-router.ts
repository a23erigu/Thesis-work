import express from 'express'
import { sequelizeCreateSimple, sequelizeReadSimple, sequelizeUpdateSimple, sequelizeDeleteSimple } from './sequelize-simple-controller'
import { sequelizeCreateAdvanced, sequelizeReadAdvanced, sequelizeUpdateAdvanced, sequelizeDeleteAdvanced } from './sequelize-advanced-controller'

const sequelizeRouter = express.Router();

sequelizeRouter.get('/createSimple', sequelizeCreateSimple);
sequelizeRouter.get('/readSimple', sequelizeReadSimple);
sequelizeRouter.get('/updateSimple', sequelizeUpdateSimple);
sequelizeRouter.get('/deleteSimple', sequelizeDeleteSimple);

sequelizeRouter.get('/createAdvanced', sequelizeCreateAdvanced);
sequelizeRouter.get('/readAdvanced', sequelizeReadAdvanced);
sequelizeRouter.get('/updateAdvanced', sequelizeUpdateAdvanced);
sequelizeRouter.get('/deleteAdvanced', sequelizeDeleteAdvanced)

module.exports = sequelizeRouter;