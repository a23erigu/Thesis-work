import express from 'express';
import dotenv from 'dotenv';
import { MemoryUsageChecker } from './memory-usage'

dotenv.config();

const app = express();
const PORT = 8090;    // the port used by the website
const memoryChecker = new MemoryUsageChecker;
const memoryTracker = memoryChecker.initialize();

memoryChecker.createFile();

app.use(express.json());

app.get('/reset', (req, res) => {
    setTimeout(() => {
        global.gc?.();
        console.log("Garbage collector run");
        res.send("reset called");
    }, 100);
});

// Memory tracker middleware (memory check after request is sent)
app.use((req, res, next) => {
    res.on('finish', () => {
        memoryTracker();
        global.gc?.();
        console.log("Request finished");
    });
    next();
});

app.use("/sequelize", require("./postgres-program/sequelize/sequelize-router"));
app.use("/prisma", require("./postgres-program/prisma/prisma-router"))
app.use("/sql", require("./postgres-program/sql/sql-router"));

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>");
});

app.listen(PORT, () => {
  console.log(`Postgres-app listening at http://localhost:${PORT}`);
});