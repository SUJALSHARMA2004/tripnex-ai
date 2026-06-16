// components/PlanModal.jsx

import { useState } from "react";

const SectionHeader = ({ title, count }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
    <h3 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "16px", fontWeight: 700,
      color: "#1a1a1a", margin: 0, letterSpacing: "0.01em", flexShrink: 0,
    }}>
      {title}
    </h3>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(251,146,60,0.3), transparent)" }} />
    {count && (
      <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(234,88,12,0.45)", flexShrink: 0 }}>
        {count.toUpperCase()}
      </span>
    )}
  </div>
);

const PlanModal = ({ plan, onClose }) => {
  const itinerary = plan?.itinerary || {};
  const days = Object.entries(itinerary);
  const [activeDay, setActiveDay] = useState(days.length > 0 ? days[0][0] : null);

  if (!plan) return null;

  const activeData = activeDay ? itinerary[activeDay] : null;

  const bestTimeColor = (time) => {
    const normalizedTime = time?.toLowerCase?.() || "";
    if (!normalizedTime) return "#9a7c6e";
    if (normalizedTime.includes("morning") || normalizedTime.includes("early")) return "#ea580c";
    if (normalizedTime.includes("evening") || normalizedTime.includes("night")) return "#8b5cf6";
    return "#0ea5e9";
  };

  const bestTimeBg = (time) => {
    const normalizedTime = time?.toLowerCase?.() || "";
    if (!normalizedTime) return "rgba(251,146,60,0.08)";
    if (normalizedTime.includes("morning") || normalizedTime.includes("early")) return "rgba(251,146,60,0.1)";
    if (normalizedTime.includes("evening") || normalizedTime.includes("night")) return "rgba(139,92,246,0.08)";
    return "rgba(14,165,233,0.08)";
  };

  const totalCost = activeData?.cost
    ? Object.values(activeData.cost).reduce((sum, val) => {
        const num = parseInt(val?.replace(/[^\d]/g, "") || "0", 10);
        return sum + num;
      }, 0)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(30,12,0,0.72)",
        backdropFilter: "blur(16px)",
        animation: "pm_fadeIn 0.22s ease-out",
      }}
      onClick={onClose}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes pm_fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pm_modalIn {
          from { opacity: 0; transform: translateY(26px) scale(0.975); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pm-scroll::-webkit-scrollbar { width: 4px; }
        .pm-scroll::-webkit-scrollbar-track { background: rgba(251,146,60,0.05); border-radius: 8px; }
        .pm-scroll::-webkit-scrollbar-thumb { background: rgba(234,88,12,0.22); border-radius: 8px; }
        .pm-scroll::-webkit-scrollbar-thumb:hover { background: rgba(234,88,12,0.42); }

        .pm-close { transition: transform 0.25s ease, background 0.2s ease; cursor: pointer; }
        .pm-close:hover { transform: rotate(90deg); background: rgba(234,88,12,0.08) !important; }

        .pm-daytab { transition: all 0.18s ease; cursor: pointer; }

        .pm-place { transition: transform 0.18s ease, border-color 0.18s ease; }
        .pm-place:hover { transform: translateX(5px); border-color: rgba(234,88,12,0.28) !important; }

        .pm-food { transition: transform 0.15s ease; cursor: default; }
        .pm-food:hover { transform: translateY(-2px); }

        .pm-cost { transition: transform 0.18s ease; }
        .pm-cost:hover { transform: translateY(-3px); }
      `}</style>

      <div
        className="relative w-full max-w-3xl max-h-[91vh] overflow-y-auto pm-scroll"
        style={{
          background: "#ffffff",
          borderRadius: "22px",
          border: "1px solid rgba(234,88,12,0.13)",
          boxShadow: "0 28px 70px rgba(180,60,0,0.16), 0 0 0 1px rgba(251,146,60,0.05)",
          fontFamily: "'DM Sans', sans-serif",
          animation: "pm_modalIn 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div style={{
          height: "4px", borderRadius: "22px 22px 0 0",
          background: "linear-gradient(90deg, #fdba74, #f97316, #ea580c, #c2410c)",
        }} />

        {/* Top-right ambient glow */}
        <div style={{
          position: "absolute", top: 0, right: 0, pointerEvents: "none",
          width: "280px", height: "280px", borderRadius: "0 22px 0 0",
          background: "radial-gradient(ellipse at top right, rgba(251,146,60,0.07) 0%, transparent 65%)",
        }} />

        {/* Close button */}
        <button
          className="pm-close"
          onClick={onClose}
          style={{
            position: "absolute", top: "18px", right: "18px", zIndex: 20,
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(251,146,60,0.05)",
            border: "1.5px solid rgba(234,88,12,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="relative z-10" style={{ padding: "32px 38px 38px" }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: "32px" }}>
            {/* Eyebrow rule */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,88,12,0.2))" }} />
              <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ea580c", opacity: 0.7 }}>
                AI-Powered Itinerary
              </span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(234,88,12,0.2), transparent)" }} />
            </div>

            {/* Destination title */}
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 6vw, 3.1rem)",
              fontWeight: 900,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              margin: "0 0 16px",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 55%, #c2410c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {plan.destination}
            </h2>

            {/* Badges */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                {
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  label: `${plan.days} Days`,
                },
                {
                  icon: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
                  label: plan.budget,
                },
              ].map((b, i) => (
                <div key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "5px 13px", borderRadius: "100px",
                  background: "rgba(251,146,60,0.08)",
                  border: "1px solid rgba(234,88,12,0.16)",
                  color: "#ea580c", fontSize: "12px", fontWeight: 600,
                }}>
                  {b.icon}{b.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── DAY TABS ── */}
          {days.length > 0 && (
            <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px", marginBottom: "26px", scrollbarWidth: "none" }}>
              {days.map(([day], idx) => (
                <button
                  key={day}
                  className="pm-daytab"
                  onClick={() => setActiveDay(day)}
                  style={{
                    flexShrink: 0,
                    padding: "6px 17px",
                    borderRadius: "6px",
                    fontSize: "11px", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    background: activeDay === day
                      ? "linear-gradient(135deg, #f97316, #ea580c)"
                      : "transparent",
                    color: activeDay === day ? "#fff" : "#c07040",
                    border: activeDay === day ? "none" : "1.5px solid rgba(234,88,12,0.18)",
                    boxShadow: activeDay === day ? "0 6px 16px rgba(234,88,12,0.26)" : "none",
                  }}
                >
                  Day {idx + 1}
                </button>
              ))}
            </div>
          )}

          {/* ── DAY CONTENT ── */}
          {activeData && (
            <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>

              {/* Best Time + Transport */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px,1fr))", gap: "10px" }}>
                {activeData.bestTime && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 15px", borderRadius: "12px",
                    background: bestTimeBg(activeData.bestTime),
                    border: `1px solid ${bestTimeColor(activeData.bestTime)}28`,
                  }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={bestTimeColor(activeData.bestTime)} strokeWidth="1.8" opacity="0.75">
                      <circle cx="12" cy="12" r="5"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: bestTimeColor(activeData.bestTime), marginBottom: "3px" }}>Best Time</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{activeData.bestTime}</p>
                    </div>
                  </div>
                )}
                {activeData.transport && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 15px", borderRadius: "12px",
                    background: "rgba(251,146,60,0.06)",
                    border: "1px solid rgba(251,146,60,0.13)",
                  }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.8" opacity="0.7">
                      <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ea580c", opacity: 0.6, marginBottom: "3px" }}>Transport</p>
                      <p style={{ fontSize: "13px", fontWeight: 500, color: "#3a2010", margin: 0 }}>{activeData.transport}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Places */}
              {activeData.places?.length > 0 && (
                <div>
                  <SectionHeader title="Places to Visit" count={`${activeData.places.length} stops`} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                    {activeData.places.map((place, index) => {
                      const name = typeof place === "string" ? place : place.name;
                      const desc = typeof place === "object" ? place.description : null;
                      return (
                        <div key={index} className="pm-place" style={{
                          display: "flex", alignItems: "flex-start", gap: "13px",
                          padding: "12px 15px", borderRadius: "11px",
                          background: "linear-gradient(135deg, #fff8f4, #ffffff)",
                          border: "1px solid rgba(251,146,60,0.1)",
                        }}>
                          <span style={{
                            fontSize: "11px", fontWeight: 800, fontStyle: "italic",
                            fontFamily: "'Playfair Display', serif",
                            color: "#fb923c", opacity: 0.6, paddingTop: "1px", minWidth: "18px",
                          }}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{name}</p>
                            {desc && <p style={{ fontSize: "12px", color: "#9a7c6e", marginTop: "4px", lineHeight: 1.55, margin: "4px 0 0" }}>{desc}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Activities */}
              {activeData.activities?.length > 0 && (
                <div>
                  <SectionHeader title="Activities" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(195px,1fr))", gap: "7px" }}>
                    {activeData.activities.map((activity, index) => (
                      <div key={index} style={{
                        display: "flex", alignItems: "center", gap: "9px",
                        padding: "9px 12px", borderRadius: "9px",
                        background: "rgba(251,146,60,0.04)",
                        border: "1px solid rgba(251,146,60,0.1)",
                      }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fb923c", flexShrink: 0 }} />
                        <p style={{ fontSize: "13px", color: "#4a3728", margin: 0 }}>{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Food */}
              {activeData.food?.length > 0 && (
                <div>
                  <SectionHeader title="Must Try Cuisine" />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {activeData.food.map((item, index) => (
                      <span key={index} className="pm-food" style={{
                        padding: "6px 15px", borderRadius: "100px",
                        fontSize: "12px", fontWeight: 600,
                        color: "#c2410c",
                        background: "linear-gradient(135deg, rgba(251,146,60,0.09), rgba(234,88,12,0.04))",
                        border: "1px solid rgba(234,88,12,0.17)",
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cost */}
              {activeData.cost && (
                <div>
                  <SectionHeader title="Cost Breakdown" />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(105px,1fr))", gap: "9px", marginBottom: "9px" }}>
                    {Object.entries(activeData.cost).map(([key, val]) => (
                      <div key={key} className="pm-cost" style={{
                        textAlign: "center", padding: "13px 10px", borderRadius: "11px",
                        background: "linear-gradient(135deg, #fff8f4, #ffffff)",
                        border: "1px solid rgba(251,146,60,0.12)",
                      }}>
                        <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#fb923c", margin: "0 0 5px" }}>{key}</p>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{val}</p>
                      </div>
                    ))}
                  </div>
                  {totalCost !== null && (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 18px", borderRadius: "11px",
                      background: "linear-gradient(135deg, rgba(251,146,60,0.09), rgba(234,88,12,0.04))",
                      border: "1.5px solid rgba(234,88,12,0.2)",
                    }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.17em", color: "#ea580c" }}>
                        Day Total
                      </span>
                      <span style={{
                        fontSize: "21px", fontWeight: 900,
                        fontFamily: "'Playfair Display', serif",
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      }}>
                        ₹{totalCost.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Tips */}
              {activeData.tips && (
                <div style={{
                  padding: "15px 18px", borderRadius: "11px",
                  background: "rgba(251,146,60,0.04)",
                  border: "1px solid rgba(234,88,12,0.15)",
                  borderLeft: "3px solid #ea580c",
                }}>
                  <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.17em", color: "#ea580c", margin: "0 0 7px" }}>
                    Pro Tip
                  </p>
                  <p style={{ fontSize: "13px", lineHeight: 1.65, color: "#6b4f3a", fontStyle: "italic", margin: 0 }}>
                    {activeData.tips}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: "34px", paddingTop: "16px", borderTop: "1px solid rgba(251,146,60,0.1)", textAlign: "center" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(194,107,72,0.38)", margin: 0 }}>
              AI-generated travel plan · Made for your dream journey
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlanModal;