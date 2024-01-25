import { Router } from "express";
import { AddStudent, GetStudents } from "@controllers/users/student.controller"

const router = Router();

router.get("/students", GetStudents)
router.post("/students", AddStudent)

export default router;