
import { SequelizeInstance, DataTypes } from "@hooks/useSequelize";

const StudentModel = SequelizeInstance.define('student', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: [4, 20]
    }
  },
  favorite_class: {
    type: DataTypes.STRING(25),
    defaultValue: 'Computer Science'
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},
  {
    freezeTableName: true,
    // timestamps: false
  }
)

export {
  StudentModel
}