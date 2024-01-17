
import { StudentModel } from "@database/models/student.model";
import { fn, col, Op } from "@hooks/useSequelize";

const CreateStudent = async (data: any) => {
  console.log(data)
  return await StudentModel.bulkCreate([{ ...data }])
}

const GetStudents = async () => {
  return await StudentModel.findAll({
    attributes: [
      "school_year",
      "name",
      [fn('COUNT', col('school_year')), 'number_of_students'],
    ],
    // group: "school_year"
    // where: {
    //   [Op.and] : {
    //     favorite_class: "Data Science",
    //     name: "Jansuy"
    //   }
    // }
  })

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
  CreateStudent,
  GetStudents
}