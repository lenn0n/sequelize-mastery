require('@utils/custom.console');
require('dotenv').config();

const { SequelizeInstance, DataTypes } = require("@hooks/useSequelize")
const { createDatabase } = require("@hooks/useMysql")

const syncTableModels = async () => {
  console.warn("Syncing table and models...");
  const User = SequelizeInstance.define('user', {
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
    .catch(() => {
      console.log("ERR: An error occured while trying to sync data.");

      process.exit(0);
    })

  // DROP TABLE - NOT RECOMMENDED
  // SequelizeInstance.drop({ match: /_test$/});
}

createDatabase()
  .then(()=>{ 
    syncTableModels()
  })
