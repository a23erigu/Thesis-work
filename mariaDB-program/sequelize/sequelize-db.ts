const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MDB_NAME, process.env.MDB_USER, process.env.MDB_PASSWORD, {
    host: process.env.MDB_HOST,
    dialect: 'mariadb'
});

const auth = async () => {
    try{
        await sequelize.authenticate();
        console.log("Successfully connected");
    } catch(e){
        console.error("Could not connect to database: ", e);
    }   
}
export { sequelize }