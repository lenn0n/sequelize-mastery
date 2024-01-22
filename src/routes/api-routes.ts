import { Router, Request, Response } from "express";
import { AddStudent, GetStudents } from "@controllers/users/student.controller"
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Xen API.")
})

router.get("/students", GetStudents)
router.post("/students", AddStudent)


export default router;