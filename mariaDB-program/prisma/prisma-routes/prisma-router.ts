import express from 'express';
import { prismaCreateSimple, prismaReadSimple, prismaUpdateSimple, prismaDeleteSimple } from './prisma-simple-controller';
import { prismaCreateAdvanced, prismaReadAdvanced, prismaUpdateAdvanced, prismaDeleteAdvanced } from './prisma-advanced-controller';

const prismaRouter = express.Router();

// Simple
prismaRouter.get('/createSimple', prismaCreateSimple)
prismaRouter.get('/readSimple', prismaReadSimple);
prismaRouter.get('/updateSimple', prismaUpdateSimple)
prismaRouter.get('/deleteSimple', prismaDeleteSimple)

// Advanced
prismaRouter.get('/createAdvanced', prismaCreateAdvanced)
prismaRouter.get('/readAdvanced', prismaReadAdvanced);
prismaRouter.get('/updateAdvanced', prismaUpdateAdvanced)
prismaRouter.get('/deleteAdvanced', prismaDeleteAdvanced)

module.exports = prismaRouter;