import { handleCountAvailableLot, updateLot, insertLot, retrieveLot } from "@controllers/lot.controller";
import { Router } from "express";

const router = Router();

router.get("/lot", retrieveLot)
router.get("/lot/available", handleCountAvailableLot)

router.post("/lot", insertLot)
router.put("/lot", updateLot)

export default router;