import express from 'express'
import { GetEverything, AllElement, AllOwners, AllOwnersPure } from './sequelize-controllers/sequelize-old-controller'
import { SimpleSelect, SimpleSelectPure, SimpleCreate, SimpleCreatePure, SimpleDelete, SimpleUpdate  } from './sequelize-controllers/sequelize-simple-controller';
import { AdvancedSelect, AdvancedCreate, AdvancedDelete, AdvancedUpdate } from './sequelize-controllers/sequelize-advanced-controller';

const sequelizeRouter = express.Router();

// Everything
sequelizeRouter.get("/", GetEverything);
sequelizeRouter.get("/AllElement", AllElement);

// Owners
sequelizeRouter.get("/AllOwners", AllOwners);
sequelizeRouter.get("/AllOwnersPure", AllOwnersPure);

// Simple
sequelizeRouter.get("/Simple/Select", SimpleSelect);
sequelizeRouter.get("/Simple/Select/Pure", SimpleSelectPure);
sequelizeRouter.get("/Simple/Create", SimpleCreate);
sequelizeRouter.get("/Simple/Create/Pure", SimpleCreatePure);
sequelizeRouter.get("/Simple/Delete", SimpleDelete);
sequelizeRouter.get("/Simple/Update", SimpleUpdate);

// Advanced
sequelizeRouter.get("/Advanced/Select", AdvancedSelect);
sequelizeRouter.get("/Advanced/Create", AdvancedCreate);
sequelizeRouter.get("/Advanced/Delete", AdvancedDelete);
sequelizeRouter.get("/Advanced/Update", AdvancedUpdate);

module.exports = sequelizeRouter;