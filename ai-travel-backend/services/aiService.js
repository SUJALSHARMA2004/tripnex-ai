// services/aiService.js
import axios from "axios";

const aiClient = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  timeout: 30000,
});

const extractJsonString = (text) => {
  if (typeof text !== "string") return "";

  const trimmed = text.trim();
  const codeFenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

  if (codeFenceMatch?.[1]) {
    return codeFenceMatch[1].trim();
  }

  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");

  if (first !== -1 && last !== -1 && last > first) {
    return trimmed.slice(first, last + 1);
  }

  return trimmed;
};

export const generateItinerary = async (data) => {
  try {
    const prompt = `
Create a highly detailed ${data.days}-day travel plan for ${data.destination}.

Budget: ${data.budget}
Interests: ${data.interests}

IMPORTANT:
- Return ONLY valid JSON
- No explanation
- No markdown

Each day must include:
- places (with short description)
- activities
- food recommendations
- cost breakdown
- best time to visit
- transport tips
- local tips

JSON FORMAT:
{
  "day1": {
    "places": [
      {
        "name": "Place name",
        "description": "short description"
      }
    ],
    "activities": ["activity1", "activity2"],
    "food": ["food1", "food2"],
    "cost": {
      "stay": "Rs ...",
      "food": "Rs ...",
      "transport": "Rs ..."
    },
    "bestTime": "morning/evening",
    "transport": "how to travel",
    "tips": "local tips"
  }
}
`;

    const response = await aiClient.post(
      `/models/gemini-3.1-flash-lite-preview:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanJson = extractJsonString(text);

    try {
      return JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);

      return {
        success: false,
        message: "AI returned invalid JSON",
        raw: text,
      };
    }
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);

    return {
      success: false,
      message: "Failed to generate itinerary",
    };
  }
};
