import express from 'express';


const app = express();
const PORT = 8090;    // the port used by the website

app.use(express.json());

app.use("/sequelize", require("./postgres-program/sequelize-router"))

app.get('/', async(req, res) => {
    res.send("<H1> Server is working <H1>")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});