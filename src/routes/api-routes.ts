import { handleCountAvailableLot, handleUpdateDiscountPrice, insertLot, retrieveLot } from "@controllers/lot.controller";
import { Router } from "express";

const router = Router();

router.get("/lot", retrieveLot)
router.get("/lot/available", handleCountAvailableLot)

router.post("/lot", insertLot)
router.put("/lot", handleUpdateDiscountPrice)

export default router;