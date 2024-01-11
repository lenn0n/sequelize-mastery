require('dotenv').config();
const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const { DataTypes } = Sequelize;

const { info, error, warn } = console;
console.info = (arg) => {
  info.call(console, `\x1b[32m${arg}\x1b[0m`);
};
console.error = (arg) => {
  error.call(console, `\x1b[31m${arg}\x1b[0m`);
};
console.warn = (arg) => {
  warn.call(console, `\x1b[36m${arg}\x1b[0m`);
};

const createDatabase = async () => {
  console.warn('Connecting to database...');
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
    .then(connection => {
      console.info('Successfully created connection.');
      console.warn('Creating database if not exists...');
      return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_SCHEMA};`)
    })
    .then((res) => {
      console.info("Database created successfully.");
      syncTableModels();
    })
    .catch((err) => {
      console.error('ERR: Database creation failed. Ref: ' + err)
    })
}

const syncTableModels = async () => {
  console.warn("Syncing table and models...");
  const sequelize = new Sequelize(
    process.env.DB_SCHEMA,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: { freezeTableName: true }
  });

  const User = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21
    }
  },
    {
      // freezeTableName: true,
      // timestamps: false
    }
  );

  // DROP TABLE AND CREATE NEW
  //  force: true

  User.sync({ alter: true })
    .then(() => {
      console.info("Table and models synced successfully!");
      return User.create({
        username: 'lennon',
        password: 'test',
        age: 27
      })
    })
    .then(()=> {
      process.exit(0);
    })
    .catch((err) => {
      console.log("ERR: An error occured while trying to sync data.");
      console.log(err);
      process.exit(0);
    })

  // DROP TABLE - NOT RECOMMENDED
  // sequelize.drop({ match: /_test$/});
}

createDatabase();
