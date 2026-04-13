import express from 'express'
import { SimpleSelect, SimpleCreate, SimpleDelete, SimpleUpdate } from './sql-controllers/sql-simple-controller';
import { AdvancedSelect, AdvancedCreate, AdvancedDelete, AdvancedUpdate} from './sql-controllers/sql-advanced-controller';

const sqlRouter = express.Router();

// Simple
sqlRouter.get("/Simple/Select", SimpleSelect);
sqlRouter.get("/Simple/Create", SimpleCreate);
sqlRouter.get("/Simple/Delete", SimpleDelete);
sqlRouter.get("/Simple/Update", SimpleUpdate)

// Advanced
sqlRouter.get("/Advanced/Select", AdvancedSelect);
sqlRouter.get("/Advanced/Create", AdvancedCreate);
sqlRouter.get("/Advanced/Delete", AdvancedDelete);
sqlRouter.get("/Advanced/Update", AdvancedUpdate)

module.exports = sqlRouter;