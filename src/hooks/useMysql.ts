const mysql = require("mysql2/promise");

const createDatabase = async () => {
  console.warn('Creating a connection to mySQL2 promise...');
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
    .then((connection: any) => {
      console.info('Successfully created connection.');
      console.warn('Creating database if not exists...');
      return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_SCHEMA};`)
    })
    .then((res: any) => {
      console.info(`Database '${process.env.DB_SCHEMA}' was created successfully.`);
    })
    .catch((err: any) => {
      console.error('ERR: Database creation failed. Ref: ' + err)
    })
}

export {
  createDatabase
}