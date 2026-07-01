import express from 'express'
import { SimpleSelect, SimpleCreate, SimpleDelete, SimpleUpdate } from './sql-controllers/sql-simple-controller';
import { AdvancedSelect, AdvancedCreate, AdvancedDelete, AdvancedUpdate} from './sql-controllers/sql-advanced-controller';

const sqlRouter = express.Router();

// Simple
sqlRouter.get("/readSimple", SimpleSelect);
sqlRouter.get("/createSimple", SimpleCreate);
sqlRouter.get("/deleteSimple", SimpleDelete);
sqlRouter.get("/updateSimple", SimpleUpdate);

// Advanced
sqlRouter.get("/readAdvanced", AdvancedSelect);
sqlRouter.get("/createAdvanced", AdvancedCreate);
sqlRouter.get("/deleteAdvanced", AdvancedDelete);
sqlRouter.get("/updateAdvanced", AdvancedUpdate);

module.exports = sqlRouter;