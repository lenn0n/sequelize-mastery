import { Router, Request, Response, NextFunction } from "express";
import { CreateStudent, GetStudents } from "@controllers/users/student.controller"
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Xen API.")
})

router.get("/students", async (req: Request, res: Response) => {
  await GetStudents().then((data) => {
    res.status(200).json(data)
  })
})

router.post("/students", async (req: Request, res: Response) => {
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

  return await CreateStudent(req.body).then(() => {
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

})


export default router;