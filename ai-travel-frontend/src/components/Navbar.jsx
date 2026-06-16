// components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          fontFamily: "'Georgia', serif",
          transition: "all 0.3s ease",
          background: isScrolled
            ? "rgba(255,255,255,0.96)"
            : "rgba(255,255,255,1)",
          borderBottom: isScrolled
            ? "1px solid rgba(251,146,60,0.2)"
            : "1px solid rgba(251,146,60,0.12)",
          boxShadow: isScrolled
            ? "0 4px 24px rgba(234,88,12,0.1), 0 1px 4px rgba(0,0,0,0.05)"
            : "0 1px 8px rgba(234,88,12,0.06)",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 no-underline"
              style={{ textDecoration: "none" }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #ea580c)",
                  boxShadow: "0 4px 12px rgba(234,88,12,0.3)",
                }}
              >
                <span style={{ fontSize: "16px" }}>✈</span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-base font-bold"
                  style={{
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  TripNex AI
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#fb923c", letterSpacing: "0.1em" }}
                >
                  Smart Travel Planner
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
                style={{
                  color: isActive("/") ? "#ea580c" : "#6b4f3a",
                  background: isActive("/")
                    ? "rgba(251,146,60,0.1)"
                    : "transparent",
                  border: isActive("/")
                    ? "1px solid rgba(251,146,60,0.25)"
                    : "1px solid transparent",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "rgba(251,146,60,0.06)";
                    e.currentTarget.style.color = "#ea580c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#6b4f3a";
                  }
                }}
              >
                Home
                {isActive("/") && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: "18px",
                      height: "2px",
                      background: "linear-gradient(90deg, #fb923c, #ea580c)",
                      display: "block",
                    }}
                  />
                )}
              </Link>

              <Link
                to="/plans"
                className="relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
                style={{
                  color: isActive("/plans") ? "#ea580c" : "#6b4f3a",
                  background: isActive("/plans")
                    ? "rgba(251,146,60,0.1)"
                    : "transparent",
                  border: isActive("/plans")
                    ? "1px solid rgba(251,146,60,0.25)"
                    : "1px solid transparent",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/plans")) {
                    e.currentTarget.style.background = "rgba(251,146,60,0.06)";
                    e.currentTarget.style.color = "#ea580c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/plans")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#6b4f3a";
                  }
                }}
              >
                My Plans
                {isActive("/plans") && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: "18px",
                      height: "2px",
                      background: "linear-gradient(90deg, #fb923c, #ea580c)",
                      display: "block",
                    }}
                  />
                )}
              </Link>

              {/* CTA pill */}
              <Link
                to="/"
                className="ml-3 px-5 py-2 rounded-xl text-sm font-bold no-underline transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #fb923c, #ea580c)",
                  color: "#fff",
                  letterSpacing: "0.04em",
                  boxShadow: "0 4px 14px rgba(234,88,12,0.3)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(234,88,12,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(234,88,12,0.3)";
                }}
              >
                Plan a Trip ✦
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none"
              style={{
                background: isMobileMenuOpen
                  ? "rgba(251,146,60,0.1)"
                  : "transparent",
                border: "1px solid rgba(251,146,60,0.2)",
              }}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    height: "2px",
                    background: "#ea580c",
                    transformOrigin: "center",
                    transform: isMobileMenuOpen
                      ? "rotate(45deg) translateY(7px)"
                      : "none",
                  }}
                />
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    height: "2px",
                    background: "#ea580c",
                    opacity: isMobileMenuOpen ? 0 : 1,
                    width: isMobileMenuOpen ? "0" : "100%",
                  }}
                />
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    height: "2px",
                    background: "#ea580c",
                    transformOrigin: "center",
                    transform: isMobileMenuOpen
                      ? "rotate(-45deg) translateY(-7px)"
                      : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isMobileMenuOpen ? "200px" : "0",
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          <div
            className="px-4 pt-2 pb-4 space-y-1"
            style={{
              borderTop: "1px solid rgba(251,146,60,0.12)",
              background: "#fffaf7",
            }}
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
              style={{
                color: isActive("/") ? "#ea580c" : "#6b4f3a",
                background: isActive("/") ? "rgba(251,146,60,0.1)" : "transparent",
                border: isActive("/")
                  ? "1px solid rgba(251,146,60,0.2)"
                  : "1px solid transparent",
                textDecoration: "none",
              }}
            >
              <span>🏠</span> Home
            </Link>
            <Link
              to="/plans"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 no-underline"
              style={{
                color: isActive("/plans") ? "#ea580c" : "#6b4f3a",
                background: isActive("/plans")
                  ? "rgba(251,146,60,0.1)"
                  : "transparent",
                border: isActive("/plans")
                  ? "1px solid rgba(251,146,60,0.2)"
                  : "1px solid transparent",
                textDecoration: "none",
              }}
            >
              <span>📋</span> My Plans
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;