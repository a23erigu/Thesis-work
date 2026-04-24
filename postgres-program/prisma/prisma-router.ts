import express from 'express'
import { prismaCreateSimple, prismaReadSimple, prismaUpdateSimple, prismaDeleteSimple } from './prisma-controllers/prisma-simple-controller'
import { prismaCreateAdvanced, prismaReadAdvanced, prismaUpdateAdvanced, prismaDeleteAdvanced } from './prisma-controllers/prisma-advanced-controller';

const prismaRouter = express.Router();

// Simple
prismaRouter.get('/Simple/Create', prismaCreateSimple)
prismaRouter.get('/Simple/Select', prismaReadSimple);
prismaRouter.get('/Simple/Update', prismaUpdateSimple)
prismaRouter.get('/Simple/Delete', prismaDeleteSimple)

// Advanced
prismaRouter.get('/Advanced/Create', prismaCreateAdvanced)
prismaRouter.get('/Advanced/Select', prismaReadAdvanced);
prismaRouter.get('/Advanced/Update', prismaUpdateAdvanced)
prismaRouter.get('/Advanced/Delete', prismaDeleteAdvanced)

module.exports = prismaRouter;