// controllers/travelController.js
import mongoose from "mongoose";
import Travel from "../models/Travel.js";
import { generateItinerary } from "../services/aiService.js";

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const isValidPlanId = (id) => mongoose.isValidObjectId(id);

export const createPlan = asyncHandler(async (req, res) => {
  const { destination, days, budget, interests } = req.body;

  if (!destination || !days) {
    return res.status(400).json({
      success: false,
      message: "Destination and days are required",
    });
  }

  if (typeof days !== "number" || days <= 0) {
    return res.status(400).json({
      success: false,
      message: "Days must be a positive number",
    });
  }

  let formattedInterests = interests;
  if (typeof interests === "string") {
    formattedInterests = interests.split(",").map((item) => item.trim());
  }

  const aiData = await generateItinerary({
    destination,
    days,
    budget,
    interests: formattedInterests,
  });

  if (aiData?.success === false) {
    res.status(502);
    throw new Error(aiData.message || "Failed to generate itinerary");
  }

  const travel = await Travel.create({
    destination,
    days,
    budget,
    interests: formattedInterests,
    itinerary: aiData,
  });

  res.status(201).json({
    success: true,
    data: travel,
  });
});

export const getPlans = asyncHandler(async (req, res) => {
  const plans = await Travel.find().sort({ createdAt: -1 }).lean();

  res.status(200).json({
    success: true,
    count: plans.length,
    data: plans,
  });
});

export const getPlanById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidPlanId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid plan id",
    });
  }

  const plan = await Travel.findById(id);

  if (!plan) {
    return res.status(404).json({
      success: false,
      message: "Plan not found",
    });
  }

  res.json({
    success: true,
    data: plan,
  });
});

export const deletePlan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidPlanId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid plan id",
    });
  }

  const plan = await Travel.findById(id);

  if (!plan) {
    return res.status(404).json({
      success: false,
      message: "Plan not found",
    });
  }

  await plan.deleteOne();

  res.json({
    success: true,
    message: "Plan deleted successfully",
  });
});
