import express from 'express'
import { SimpleSelect, SimpleCreate } from './sql-controller';

const sqlRouter = express.Router();

sqlRouter.get("/Simple/Select", SimpleSelect);
sqlRouter.get("/Simple/Create", SimpleCreate);

module.exports = sqlRouter;