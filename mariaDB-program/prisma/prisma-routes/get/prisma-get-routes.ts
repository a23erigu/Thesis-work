import express from 'express'
import { prismaGetSimple, prismaGetAdvanced } from './prisma-get-controller'

const prismaGetRouter = express.Router();

prismaGetRouter.get('/simple', prismaGetSimple);
prismaGetRouter.get('/advanced', prismaGetAdvanced);

module.exports = prismaGetRouter;