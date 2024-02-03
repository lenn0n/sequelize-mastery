import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const ClientModel = SequelizeInstance.define("client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  },
  {
    freezeTableName: true
  }
)

export {
  ClientModel
}