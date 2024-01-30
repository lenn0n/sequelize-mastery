import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const LotModel = SequelizeInstance.define("lot",
  {
    lot_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
    },
    agent_id: {
      type: DataTypes.INTEGER,
    },
    area: {
      type: DataTypes.STRING(26),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(26),
      defaultValue: "COMMERCIAL"
    },
    sqm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_per_sqm: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING(255),
      defaultValue: "None"
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    freezeTableName: true
  }
)

export {
  LotModel
}