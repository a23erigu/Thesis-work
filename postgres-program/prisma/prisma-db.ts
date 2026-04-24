import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../prisma-ORM/postgres/prisma/generated/prisma/client";

const adapter = new PrismaPg({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_NAME,
    connectionLimit: 10
})
const prisma = new PrismaClient({ adapter });

export { prisma };