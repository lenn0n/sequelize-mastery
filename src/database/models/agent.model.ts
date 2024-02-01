import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const AgentModel = SequelizeInstance.define("agent",
  {
    agent_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    agent_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
)

export {
  AgentModel
}