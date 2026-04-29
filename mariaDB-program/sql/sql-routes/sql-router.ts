import express from 'express';
import { sqlCreateSimple, sqlCreateSimpleRand, sqlReadSimple, sqlUpdateSimple, sqlDeleteSimple } from './sql-simple-controller';
import { sqlCreateAdvanced, sqlReadAdvanced, sqlUpdateAdvanced, sqlDeleteAdvanced } from './sql-advanced-controller';

const sqlRouter = express.Router();

// Simple
sqlRouter.get('/createSimple', sqlCreateSimple);
sqlRouter.get('/createSimpleRand', sqlCreateSimpleRand);
sqlRouter.get('/readSimple', sqlReadSimple);
sqlRouter.get('/updateSimple', sqlUpdateSimple);
sqlRouter.get('/deleteSimple', sqlDeleteSimple);

// Advanced
sqlRouter.get('/createAdvanced', sqlCreateAdvanced);
sqlRouter.get('/readAdvanced', sqlReadAdvanced);
sqlRouter.get('/updateAdvanced', sqlUpdateAdvanced);
sqlRouter.get('/deleteAdvanced', sqlDeleteAdvanced);

module.exports = sqlRouter;