import { Router } from "express";
import { getLotList } from "@services/lot.service";
const router = Router();

router.get("/lot", getLotList)
export default router;