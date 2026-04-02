import express from 'express';
import dotenv from 'dotenv';

const process = require('process');

dotenv.config();

const app = express();
const PORT = process.env.MDB_APP_PORT || 5000;

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>")
})

app.listen(PORT, () => {
    console.log(
        `Listening on port ${PORT}, process ID: ` + process.pid + ` process name: ` + process.title
    );
});