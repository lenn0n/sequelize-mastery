import { insertAgent, removeAgent, retrieveAgent, updateAgent } from "@controllers/agent.controller";
import { insertClient, removeClient, retrieveClient, updateClient } from "@controllers/client.controller";
import { handleCountAvailableLot, updateLot, insertLot, retrieveLot, removeLot } from "@controllers/lot.controller";
import { insertMethod, removeMethod, retrieveMethod, updateMethod } from "@controllers/method.controller";
import { insertProject, removeProject, retrieveProject, updateProject } from "@controllers/project.controller";

import { Router } from "express";
const router = Router();

// Lot Services
router.get("/lot", retrieveLot)
router.put("/lot", updateLot)
router.post("/lot", insertLot)
router.delete("/lot", removeLot)
router.get("/lot/available", handleCountAvailableLot)

// Agent Services
router.get("/agent", retrieveAgent)
router.put("/agent", updateAgent)
router.post("/agent", insertAgent)
router.delete("/agent", removeAgent)

// Client Services
router.get("/client", retrieveClient)
router.put("/client", updateClient)
router.post("/client", insertClient)
router.delete("/client", removeClient)

// Project Services
router.get("/project", retrieveProject)
router.put("/project", updateProject)
router.post("/project", insertProject)
router.delete("/project", removeProject)

// Method Services
router.get("/method", retrieveMethod)
router.put("/method", updateMethod)
router.post("/method", insertMethod)
router.delete("/method", removeMethod)

// Payment Services
router.get("/payment", retrieveLot)
router.put("/payment", retrieveLot)
router.post("/payment", retrieveLot)
router.delete("/payment")

export default router;