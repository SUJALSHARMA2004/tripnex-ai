// models/Travel.js
import mongoose from "mongoose";

const travelSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      trim: true,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    interests: {
      type: [String], // 🔥 FIXED (ARRAY)
      default: [],
    },
    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Travel", travelSchema);