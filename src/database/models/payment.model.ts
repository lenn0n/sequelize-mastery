import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const PaymentModel = SequelizeInstance.define("payment",
  {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    method_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING(255),
      defaultValue: "None"
    },
    lot_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transaction_number: {
      type: DataTypes.STRING(255),
      defaultValue: "None"
    },
  },
  {
    freezeTableName: true
  }
)

export {
  PaymentModel
}