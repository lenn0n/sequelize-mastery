require('dotenv').config();
const Sequelize = require("sequelize");
const { Op, DataTypes, fn, col, QueryTypes, literal } = Sequelize;

const SequelizeInstance = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  define: { freezeTableName: true }
});

export {
  SequelizeInstance,
  Op,
  DataTypes,
  fn,
  col,
  QueryTypes,
  literal
}