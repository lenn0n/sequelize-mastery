import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const ProjectModel = SequelizeInstance.define("project",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
)

export {
  ProjectModel
}