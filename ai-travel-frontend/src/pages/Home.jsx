// pages/Home.jsx
import TripForm from "../components/TripForm";
import goaBeach from "../assets/beaches-goa.webp";

const Home = () => {
  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${goaBeach})`,
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Background decorative blobs */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,146,60,0.13) 0%, transparent 70%)",
        }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-60px",
          left: "-60px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,146,60,0.09) 0%, transparent 70%)",
        }}
      />

      <div
        className="fixed pointer-events-none"
        style={{
          top: "40%",
          left: "-40px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(234,88,12,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-4 pt-14 pb-16">
        {/* Hero text */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.25)",
                letterSpacing: "0.12em",
                backdropFilter: "blur(10px)",
              }}
            >
              <span style={{ fontSize: "9px" }}>✦</span>
              AI-Powered Travel
              <span style={{ fontSize: "9px" }}>✦</span>
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl font-bold mb-4 leading-tight"
            style={{
              color: "#ffffff",
              letterSpacing: "-0.03em",
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            Discover Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #fbbf24, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dream Trip
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base"
            style={{
              color: "rgba(255,255,255,0.9)",
              lineHeight: "1.7",
            }}
          >
            Let AI craft the perfect itinerary tailored to your{" "}
            <span
              style={{
                color: "#fbbf24",
                fontStyle: "italic",
                fontWeight: "600",
              }}
            >
              interests, budget & timeline.
            </span>
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            {[
              { icon: "🌍", label: "200+ Destinations" },
              { icon: "⚡", label: "Instant Plans" },
              { icon: "🎯", label: "Personalized" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <TripForm />

        {/* Footer Note */}
        <p
          className="text-center text-xs mt-6"
          style={{
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.02em",
          }}
        >
          No account needed · Free to use · Plans in seconds
        </p>
      </div>
    </div>
  );
};

export default Home;