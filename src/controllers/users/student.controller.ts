
import { StudentModel } from "@database/models/student.model";
import { fn, col, Op } from "@hooks/useSequelize";

const CreateStudent = async (data: any) => {
  console.log(data)
  return await StudentModel.bulkCreate([{...data}])
}

const GetStudents = async () => {
  return await StudentModel.findAll({
    attributes: [
      "school_year",
      [fn('COUNT', col('school_year')), 'number_of_students'],
    ],
    group: "school_year"
    // where: {
    //   [Op.and] : {
    //     favorite_class: "Data Science",
    //     name: "Jansuy"
    //   }
    // }
  })
}

export {
  CreateStudent,
  GetStudents
}