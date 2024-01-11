const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
);

const User = sequelize.define(
  'user', { 
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.DataTypes.STRING, 
    },
    age: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 21
    }
  }
);

User.sync().then(()=>{
  console.log("Table and model synced successfully!");
}).catch((err)=>{
  console.log(err);
})