import express from 'express'
import { GetEverything, AllElement, AllOwners, AllOwnersPure } from './sequelize-controllers/sequelize-old-controller'
import { SimpleSelect, SimpleCreate, SimpleDelete, SimpleUpdate  } from './sequelize-controllers/sequelize-simple-controller';
import { AdvancedSelect, AdvancedCreate, AdvancedDelete, AdvancedUpdate } from './sequelize-controllers/sequelize-advanced-controller';

const sequelizeRouter = express.Router();

// Everything
sequelizeRouter.get("/", GetEverything);
sequelizeRouter.get("/AllElement", AllElement);

// Owners
sequelizeRouter.get("/AllOwners", AllOwners);
sequelizeRouter.get("/AllOwnersPure", AllOwnersPure);

// Simple
sequelizeRouter.get("/readSimple", SimpleSelect);
sequelizeRouter.get("/createSimple", SimpleCreate);
sequelizeRouter.get("/deleteSimple", SimpleDelete);
sequelizeRouter.get("/updateSimple", SimpleUpdate);

// Advanced
sequelizeRouter.get("/readAdvanced", AdvancedSelect);
sequelizeRouter.get("/createAdvanced", AdvancedCreate);
sequelizeRouter.get("/deleteAdvanced", AdvancedDelete);
sequelizeRouter.get("/updateAdvanced", AdvancedUpdate);

module.exports = sequelizeRouter;