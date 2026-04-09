import express from 'express';
import dotenv from 'dotenv';
import { MemoryUsageChecker } from './memory-usage'

const process = require('process');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const memoryChecker = new MemoryUsageChecker;
const memoryTracker = memoryChecker.initialize();

memoryChecker.createFile();

app.use(express.json());

// Memory tracker middleware (memory check after request is complete)
app.use((req, res, next) => {
    res.on('finish', () => {
        memoryTracker();
    });
    next();
});

// Establish endpoints (put request endpoints here)
app.use('/prisma/get', require('./mariaDB-program/prisma/prisma-routes/get/prisma-get-routes'));
app.use('/sql/get', require('./mariaDB-program/sql/sql-routes/get/sql-get-routes'));

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