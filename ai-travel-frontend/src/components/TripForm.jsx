// components/TripForm.jsx
import { useState } from "react";
import { createPlan } from "../api/travelApi";

const TripForm = () => {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budget: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.destination || !form.days || !form.budget || !form.interests) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const payload = {
      ...form,
      days: Number(form.days),
      interests: form.interests.split(",").map((i) => i.trim()),
    };

    try {
      const res = await createPlan(payload);
      console.log(res.data);
      alert("✅ Plan Created Successfully!");
      setForm({ destination: "", days: "", budget: "", interests: "" });
    } catch (err) {
      alert("Error creating plan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: "linear-gradient(135deg, #fff7f0 0%, #fff 50%, #fff3e8 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Decorative background blobs */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="w-full max-w-lg relative">
        {/* Floating badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(251,146,60,0.12)",
              color: "#ea580c",
              border: "1px solid rgba(251,146,60,0.3)",
              letterSpacing: "0.12em",
            }}
          >
            <span style={{ fontSize: "10px" }}>✦</span>
            AI-Powered Planning
            <span style={{ fontSize: "10px" }}>✦</span>
          </span>
        </div>

        {/* Main card */}
        <div
          className="rounded-3xl p-8 shadow-2xl"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(251,146,60,0.2)",
            boxShadow:
              "0 20px 60px rgba(251,146,60,0.12), 0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{
                background: "linear-gradient(135deg, #fb923c, #ea580c)",
                boxShadow: "0 8px 20px rgba(234,88,12,0.35)",
              }}
            >
              <span style={{ fontSize: "24px" }}>✈</span>
            </div>
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                color: "#1a1a1a",
                fontFamily: "'Georgia', serif",
                letterSpacing: "-0.02em",
              }}
            >
              Travel Planner
            </h1>
            <p
              className="text-sm"
              style={{ color: "#9a7c6e", letterSpacing: "0.02em" }}
            >
              Craft your perfect journey in seconds
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Destination */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#ea580c", letterSpacing: "0.1em" }}
              >
                Destination
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                  style={{ color: "#fb923c" }}
                >
                  📍
                </span>
                <input
                  placeholder="Paris, Tokyo, Goa…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "#fff8f4",
                    border: "1.5px solid #fed7aa",
                    color: "#1a1a1a",
                    fontFamily: "'Georgia', serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #fb923c";
                    e.target.style.boxShadow = "0 0 0 3px rgba(251,146,60,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1.5px solid #fed7aa";
                    e.target.style.boxShadow = "none";
                  }}
                  value={form.destination}
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Days & Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#ea580c", letterSpacing: "0.1em" }}
                >
                  Days
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                    style={{ color: "#fb923c" }}
                  >
                    🗓
                  </span>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                    style={{
                      background: "#fff8f4",
                      border: "1.5px solid #fed7aa",
                      color: "#1a1a1a",
                      fontFamily: "'Georgia', serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1.5px solid #fb923c";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(251,146,60,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1.5px solid #fed7aa";
                      e.target.style.boxShadow = "none";
                    }}
                    value={form.days}
                    onChange={(e) =>
                      setForm({ ...form, days: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: "#ea580c", letterSpacing: "0.1em" }}
                >
                  Budget
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                    style={{ color: "#fb923c" }}
                  >
                    💰
                  </span>
                  <input
                    placeholder="₹15,000"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                    style={{
                      background: "#fff8f4",
                      border: "1.5px solid #fed7aa",
                      color: "#1a1a1a",
                      fontFamily: "'Georgia', serif",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1.5px solid #fb923c";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(251,146,60,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1.5px solid #fed7aa";
                      e.target.style.boxShadow = "none";
                    }}
                    value={form.budget}
                    onChange={(e) =>
                      setForm({ ...form, budget: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "#ea580c", letterSpacing: "0.1em" }}
              >
                Interests
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none"
                  style={{ color: "#fb923c" }}
                >
                  🎯
                </span>
                <input
                  placeholder="beaches, nightlife, food…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "#fff8f4",
                    border: "1.5px solid #fed7aa",
                    color: "#1a1a1a",
                    fontFamily: "'Georgia', serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1.5px solid #fb923c";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(251,146,60,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1.5px solid #fed7aa";
                    e.target.style.boxShadow = "none";
                  }}
                  value={form.interests}
                  onChange={(e) =>
                    setForm({ ...form, interests: e.target.value })
                  }
                />
              </div>
              <p
                className="text-xs mt-1.5"
                style={{ color: "#c4a08a" }}
              >
                Separate multiple interests with commas
              </p>
            </div>

            {/* Divider */}
            <div
              className="my-1"
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(251,146,60,0.25), transparent)",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all relative overflow-hidden"
              style={{
                background: loading
                  ? "linear-gradient(135deg, #fdba74, #fb923c)"
                  : "linear-gradient(135deg, #fb923c, #ea580c)",
                color: "#ffffff",
                border: "none",
                letterSpacing: "0.12em",
                boxShadow: loading
                  ? "none"
                  : "0 8px 25px rgba(234,88,12,0.4), 0 2px 8px rgba(234,88,12,0.2)",
                cursor: loading ? "not-allowed" : "pointer",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 12px 30px rgba(234,88,12,0.45), 0 4px 10px rgba(234,88,12,0.25)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(234,88,12,0.4), 0 2px 8px rgba(234,88,12,0.2)";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Generating your plan…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🚀</span> Generate Plan
                </span>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p
            className="text-center text-xs mt-5"
            style={{ color: "#c4a08a" }}
          >
            Powered by AI · Plans ready in seconds
          </p>
        </div>

        {/* Bottom decorative dots */}
        <div className="flex justify-center gap-2 mt-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 2 ? "20px" : "6px",
                height: "6px",
                background: i === 2 ? "#fb923c" : "rgba(251,146,60,0.3)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripForm;