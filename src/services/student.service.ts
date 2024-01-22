
import { StudentModel } from "@database/models/student.model";
import { fn, col, Op, SequelizeInstance, QueryTypes } from "@hooks/useSequelize";

const createStudent = async (data: any) => {
  // Take note when using 'bulkCreate': the error response is different from using 'create' only.
  // It should be passed here as array and iterate the error messages from catch.
  return await StudentModel.create({ ...data }, { validate: true })
}

const getStudentsByYear = async (years : number[]) => {
  return await SequelizeInstance.query(
    "SELECT * FROM student WHERE school_year IN (:year)",
    {
      type: QueryTypes.SELECT,
      replacements: { 
        year: years
      }  
    }
  )

  // return await StudentModel.findAll({
  //   attributes: [
  //     ["name", "full_name"],
  //     ["favorite_class", "fav_class"],
  //     ["school_year", "year"],
  //     ["student_id", "id"]
  //   ],
  //   where: {
  //     school_year: {
  //       [Op.and]: [
  //         { [Op.gt]: 2000 },
  //         { [Op.lt]: 2013 },
  //       ]
  //     }
  //   }
  // })
}

export {
  createStudent,
  getStudentsByYear
}