import express from 'express';
import dotenv from 'dotenv';

const process = require('process');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/prisma/get', require('./mariaDB-program/prisma/prisma-routes/get/prisma-get-routes'));
app.use('/sql/get', require('./mariaDB-program/sql/sql-routes/get/sql-get-routes'));

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>")
})

app.listen(PORT, () => {
    console.log(
        // PID & PPath might not work on windows
        `Listening on port: ${PORT}, \n
        process ID: ${process.pid}, \n
        process path: ${process.title}`
    );
});