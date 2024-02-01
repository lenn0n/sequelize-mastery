import { Router } from "express";

import { 
  handleCountAvailableLot, 
  updateLot, 
  insertLot, 
  retrieveLot, 
  removeLot, 
  retrieveOverallLot
} from "@controllers/lot.controller";

import { 
  getAgentCount,
  getTopAgent,
  insertAgent, 
  removeAgent, 
  retrieveAgent, 
  updateAgent 
} from "@controllers/agent.controller";

import { 
  getClientCount,
  insertClient,
  removeClient, 
  retrieveClient, 
  updateClient 
} from "@controllers/client.controller";

import { 
  insertMethod, 
  removeMethod, 
  retrieveMethod, 
  updateMethod 
} from "@controllers/method.controller";

import { 
  getTotalCollectibles,
  insertPayment, 
  removePayment, 
  retrievePayment, 
  updatePayment 
} from "@controllers/payment.controller";

import { 
  insertProject, 
  removeProject, 
  retrieveProject, 
  updateProject 
} from "@controllers/project.controller";

const router = Router();

// Lot Services
router.get("/lot", retrieveLot)
router.put("/lot", updateLot)
router.post("/lot", insertLot)
router.delete("/lot", removeLot)
router.get("/lot/available", handleCountAvailableLot)
router.get("/lot/overall", retrieveOverallLot)

// Agent Services
router.get("/agent", retrieveAgent)
router.put("/agent", updateAgent)
router.post("/agent", insertAgent)
router.delete("/agent", removeAgent)
router.get("/agent/top", getTopAgent)
router.get("/agent/count", getAgentCount)

// Client Services
router.get("/client", retrieveClient)
router.put("/client", updateClient)
router.post("/client", insertClient)
router.delete("/client", removeClient)
router.get("/client/count", getClientCount)

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
router.get("/payment", retrievePayment)
router.put("/payment", updatePayment)
router.post("/payment", insertPayment)
router.delete("/payment", removePayment)
router.get("/payment/collectibles", getTotalCollectibles)

export default router;