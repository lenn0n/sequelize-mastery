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
    remarks: {
      type: DataTypes.STRING(255),
      defaultValue: "None"
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