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
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue("agent_name", String(value).toUpperCase())
      },
      setDataValue: (x: string, y: string | number) => { return null },
      getDataValue: (x: string | number) => { return null }
    },

  },
  {
    freezeTableName: true
  }
)

export {
  AgentModel
}