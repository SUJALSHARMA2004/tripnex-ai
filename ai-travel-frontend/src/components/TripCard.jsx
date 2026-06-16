// components/TripCard.jsx

import { useState } from "react";

const TripCard = ({ plan, onDelete, onOpen }) => {
  const itinerary = plan.itinerary || {};
  const days = Object.entries(itinerary);
  const [activeDay, setActiveDay] = useState(days.length > 0 ? days[0][0] : null);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    setDeleting(true);

    try {
      await onDelete?.(plan._id);
    } catch (err) {
      console.error("Delete failed:", err);
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const activeData = activeDay ? itinerary[activeDay] : null;
  const firstPlace = activeData?.places?.[0];
  const previewPlace = typeof firstPlace === "string" ? firstPlace : firstPlace?.name;
  const totalCost = activeData?.cost
    ? Object.values(activeData.cost).reduce((sum, val) => {
        const num = parseInt(val?.replace(/[^\d]/g, "") || "0", 10);
        return sum + num;
      }, 0)
    : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .tc-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: pointer;
        }
        .tc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(234,88,12,0.13), 0 4px 12px rgba(0,0,0,0.05) !important;
          border-color: rgba(251,146,60,0.32) !important;
        }
        .tc-daybtn { transition: all 0.16s ease; cursor: pointer; }
        .tc-deletebtn { transition: background 0.18s ease, transform 0.18s ease; cursor: pointer; }
        .tc-deletebtn:hover { transform: scale(1.08); }
      `}</style>

      <div
        className="tc-card relative rounded-2xl overflow-hidden"
        onClick={() => onOpen(plan)}
        style={{
          background: "#ffffff",
          border: "1px solid rgba(251,146,60,0.14)",
          boxShadow: "0 4px 20px rgba(251,146,60,0.07)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── HEADER BAND ── */}
        <div
          style={{
            position: "relative",
            height: "110px",
            background: "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "110px", height: "110px", borderRadius: "50%",
            background: "rgba(255,255,255,0.12)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: "-20px", left: "10px",
            width: "70px", height: "70px", borderRadius: "50%",
            background: "rgba(255,255,255,0.07)", pointerEvents: "none",
          }} />

          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "rgba(255,255,255,0.25)",
          }} />

          {/* Destination + badges */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 16px 14px",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "20px", fontWeight: 900,
              color: "#fff", letterSpacing: "-0.015em",
              margin: 0, lineHeight: 1.1,
              flex: 1, minWidth: 0,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {plan.destination}
            </h2>
            <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
              {[`${plan.days}d`, plan.budget].map((label, i) => (
                <span key={i} style={{
                  fontSize: "10px", fontWeight: 700,
                  color: "rgba(255,255,255,0.92)",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: "100px",
                  padding: "3px 9px",
                  backdropFilter: "blur(6px)",
                  letterSpacing: "0.05em",
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Delete button */}
          <button
            className="tc-deletebtn"
            onClick={handleDelete}
            disabled={deleting}
            style={{
              position: "absolute", top: "10px", right: "10px", zIndex: 10,
              width: "30px", height: "30px", borderRadius: "10px",
              background: confirmDelete ? "rgba(239,68,68,0.92)" : "rgba(0,0,0,0.28)",
              border: confirmDelete ? "1.5px solid rgba(255,255,255,0.55)" : "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: deleting ? "not-allowed" : "pointer",
            }}
          >
            {deleting ? (
              <svg className="animate-spin" width="13" height="13" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            ) : confirmDelete ? (
              <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            )}
          </button>

          {confirmDelete && (
            <span style={{
              position: "absolute", bottom: "6px", right: "12px",
              fontSize: "8px", fontWeight: 700, letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.8)", zIndex: 10,
            }}>
              click again
            </span>
          )}
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: "11px" }}>

          {/* Day tabs */}
          {days.length > 0 && (
            <div style={{ display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none", paddingBottom: "2px" }}>
              {days.slice(0, 5).map(([day], idx) => (
                <button
                  key={day}
                  className="tc-daybtn"
                  onClick={(e) => { e.stopPropagation(); setActiveDay(day); }}
                  style={{
                    flexShrink: 0,
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    background: activeDay === day
                      ? "linear-gradient(135deg, #fb923c, #ea580c)"
                      : "rgba(251,146,60,0.07)",
                    color: activeDay === day ? "#fff" : "#c07040",
                    border: activeDay === day ? "none" : "1px solid rgba(251,146,60,0.15)",
                    boxShadow: activeDay === day ? "0 3px 10px rgba(234,88,12,0.22)" : "none",
                  }}
                >
                  D{idx + 1}
                </button>
              ))}
              {days.length > 5 && (
                <span style={{ fontSize: "11px", color: "#c4a08a", padding: "4px 6px", flexShrink: 0 }}>
                  +{days.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
            {[
              { label: `${plan.days} days`, icon: "📅" },
              { label: plan.budget, icon: "💰" },
              ...(totalCost ? [{ label: `₹${totalCost.toLocaleString("en-IN")}`, icon: null, highlight: true }] : []),
            ].map((item, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{
                  fontWeight: item.highlight ? 700 : 500,
                  color: item.highlight ? "#ea580c" : "#6b4f3a",
                  fontSize: item.highlight ? "13px" : "12px",
                }}>
                  {item.label}
                </span>
                {i < arr.length - 1 && (
                  <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(251,146,60,0.3)", marginLeft: "4px" }} />
                )}
              </div>
            ))}
          </div>

          {/* Preview place */}
          {previewPlace && (
            <div style={{
              display: "flex", alignItems: "center", gap: "9px",
              padding: "9px 12px", borderRadius: "10px",
              background: "linear-gradient(135deg, #fff8f4, #ffffff)",
              border: "1px solid rgba(251,146,60,0.1)",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.7" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p style={{ fontSize: "12px", color: "#4a3728", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {previewPlace}
              </p>
            </div>
          )}

          {/* Activities */}
          {activeData?.activities?.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#c4a08a" }}>
                Activities
              </span>
              {activeData.activities.slice(0, 2).map((act, i) => (
                <span key={i} style={{
                  fontSize: "11px", padding: "3px 9px", borderRadius: "100px",
                  background: "rgba(251,146,60,0.07)",
                  color: "#c2410c",
                  border: "1px solid rgba(234,88,12,0.12)",
                }}>
                  {act}
                </span>
              ))}
              {activeData.activities.length > 2 && (
                <span style={{ fontSize: "11px", color: "#c4a08a" }}>+{activeData.activities.length - 2}</span>
              )}
            </div>
          )}

          {/* Food */}
          {activeData?.food?.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#c4a08a" }}>
                Must Try
              </span>
              {activeData.food.slice(0, 2).map((item, i) => (
                <span key={i} style={{
                  fontSize: "11px", padding: "3px 9px", borderRadius: "100px",
                  background: "rgba(251,146,60,0.06)",
                  color: "#ea580c",
                  border: "1px solid rgba(234,88,12,0.1)",
                }}>
                  {item}
                </span>
              ))}
              {activeData.food.length > 2 && (
                <span style={{ fontSize: "11px", color: "#c4a08a" }}>+{activeData.food.length - 2}</span>
              )}
            </div>
          )}

          {/* Footer CTA */}
          <div style={{
            paddingTop: "10px",
            borderTop: "1px solid rgba(251,146,60,0.09)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}>
            <span style={{ fontSize: "11px", color: "rgba(194,107,72,0.5)", letterSpacing: "0.06em" }}>
              View full itinerary
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(234,88,12,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>

        </div>
      </div>
    </>
  );
};

export default TripCard;