import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../prisma-ORM/mariadb/generated/prisma/client";

const adapter = new PrismaMariaDb({
    host: process.env.MDB_HOST,
    user: process.env.MDB_USER,
    password: process.env.MDB_PASSWORD,
    database: process.env.MDB_NAME,
    connectionLimit: 10
})
const prisma = new PrismaClient({ adapter });

export { prisma };