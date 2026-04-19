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
    res.send("reset called");
    
    setTimeout(() => {
        global.gc?.();
        global.gc?.();
        console.log("Delayed GC");
    }, 100);
});

// Memory tracker middleware (memory check after request is sent)
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log("Request finished");
        memoryTracker();
    });
    next();
});

app.use("/sequelize", require("./postgres-program/sequelize/sequelize-router"));
app.use("/sql", require("./postgres-program/sql/sql-router"));

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>");
});

app.listen(PORT, () => {
  console.log(`Postgres-app listening at http://localhost:${PORT}`);
});