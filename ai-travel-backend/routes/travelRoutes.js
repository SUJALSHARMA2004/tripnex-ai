// routes/travelRoutes.js
import express from "express";
import {
  createPlan,
  getPlans,
  getPlanById,
  deletePlan,
} from "../controllers/travelController.js";

const router = express.Router();

// 🔥 Create travel plan
router.post("/plan", createPlan);

// 📥 Get all plans
router.get("/plans", getPlans);

// 📄 Get single plan
router.get("/plan/:id", getPlanById);

// ❌ Delete plan
router.delete("/plan/:id", deletePlan);

export default router;