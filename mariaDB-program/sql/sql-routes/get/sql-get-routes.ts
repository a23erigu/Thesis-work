import express from 'express'
import { sqlGetSimple, sqlGetAdvanced } from './sql-get-controller'

const sqlGetRouter = express.Router();

sqlGetRouter.get('/simple', sqlGetSimple);
sqlGetRouter.get('/advanced', sqlGetAdvanced);

module.exports = sqlGetRouter;