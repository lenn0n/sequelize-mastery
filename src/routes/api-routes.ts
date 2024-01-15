import { Router, Request, Response } from "express";
import { CreateStudent, GetStudents } from "@controllers/users/student.controller"
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Xen API.")
})

router.get("/students", async(req: Request, res: Response) => {
  await GetStudents().then((data)=>{
    res.send(data)
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

})

export default router;