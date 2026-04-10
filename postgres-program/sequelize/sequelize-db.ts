import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_NAME, process.env.PG_USER, process.env.PG_PASSWORD, {  //database, username, password
  host: process.env.PG_HOST,
  dialect: 'postgres',
  logging: console.log,
  port: process.env.PG_PORT
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.'); //tests connection
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


export { sequelize };