import { handleCountAvailableLot, insertLot, retrieveLot } from "@controllers/lot.controller";
import { Router } from "express";

const router = Router();

router.get("/lot", retrieveLot)
router.get("/available-lot", handleCountAvailableLot)
router.post("/lot", insertLot)

export default router;