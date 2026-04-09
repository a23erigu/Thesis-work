import express from 'express';
import dotenv from 'dotenv';
import { MemoryUsageChecker } from './memory_usage'

dotenv.config();

const app = express();
const PORT = 8090;    // the port used by the website
const memoryChecker = new MemoryUsageChecker;
const memoryTracker = memoryChecker.initialize();

memoryChecker.createFile();

app.use(express.json());

// Memory tracker middleware (memory check after request is complete)
app.use((req, res, next) => {
    res.on('finish', () => {
        const url = req.originalUrl.toLocaleLowerCase();

        if(url.includes("sequelize") || url.includes("sql")){
            memoryTracker();
        }
    });
    next();
});

app.use(express.json());

app.use("/sequelize", require("./postgres-program/sequelize-router"))

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});