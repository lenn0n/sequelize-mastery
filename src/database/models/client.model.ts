import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const ClientModel = SequelizeInstance.define("client",
  {
    client_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }
)

export {
  ClientModel
}