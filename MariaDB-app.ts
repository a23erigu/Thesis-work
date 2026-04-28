import express from 'express';
import dotenv from 'dotenv';
import { MemoryUsageChecker } from './memory-usage'

dotenv.config();

const process = require('process');
const app = express();
const PORT = process.env.PORT || 5000;
const memoryChecker = new MemoryUsageChecker;
const memoryTracker = memoryChecker.initialize();

app.use(express.json());

app.get('/reset', (req, res) => {
    setTimeout(() => {
        global.gc?.();
        console.log("Garbage collector run");
        res.send("Reset called");
    }, 100);
});

// Memory tracker middleware (memory check after request is complete)
app.use((req, res, next) => {
    res.on('finish', () => {
        memoryTracker();
        global.gc?.();
        console.log("Ran garbage cleaner after request");
    });
    next();
});

// Establish endpoints (put request endpoints here)
app.use('/prisma', require('./mariaDB-program/prisma/prisma-routes/prisma-router'));
app.use('/sequelize', require('./mariaDB-program/sequelize/sequelize-routes/sequelize-router'))
app.use('/sql', require('./mariaDB-program/sql/sql-routes/sql-router'));

// Test endpoint to ensure express server is running
app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>")
})

// Start server
app.listen(PORT, () => {
    console.log(
        // PID & PPath might not work on windows
        `Listening on port: ${PORT}, \n
        process ID: ${process.pid}, \n
        process path: ${process.title}`
    );
});