
import { Request, Response } from "express";
import { getStudentsByYear, createStudent } from "@services/student.service";

const AddStudent =  async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(404).json({
      error: "Please provide name."
    })
  }

  if (!req.body.favorite_class) {
    return res.status(404).json({
      error: "Please provide favorite class."
    })
  }

  if (!req.body.school_year) {
    return res.status(404).json({
      error: "Please provide school year."
    })
  }

  return await createStudent(req.body).then(() => {
    res.send("Student added successfully.")
  })
  .catch((err) => {
    err.errors.map((eObj: any) => {
      console.log(eObj.message)
      return res.status(422).json({
        message: eObj.message,
        payload: eObj.instance,
        // message: eObj.errors.errors[0].message <-- bulkCreate
      })
    })
  })
}

const GetStudents = async (req: Request, res: Response) => {
  const years = [ 2013 ]
  await getStudentsByYear(years).then((data) => {
    res.status(200).json(data)
  })
}

export {
  AddStudent,
  GetStudents
}