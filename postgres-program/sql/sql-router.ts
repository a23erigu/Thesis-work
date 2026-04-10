import express from 'express'
import { SimpleSelect, SimpleCreate, SimpleDelete, SimpleUpdate } from './sql-controller';

const sqlRouter = express.Router();

sqlRouter.get("/Simple/Select", SimpleSelect);
sqlRouter.get("/Simple/Create", SimpleCreate);
sqlRouter.get("/Simple/Delete", SimpleDelete);
sqlRouter.get("/Simple/Update", SimpleUpdate)

module.exports = sqlRouter;