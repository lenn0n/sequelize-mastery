import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const MethodModel = SequelizeInstance.define("method",
  {
    method_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    method_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  },
  {
    freezeTableName: true
  }
)

export {
  MethodModel
}