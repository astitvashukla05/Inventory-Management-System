import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fade-in" style={{
      height: "64px",
      background: "var(--bg-secondary)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 2rem",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "36px",
          height: "36px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem"
        }}>
          📦
        </div>
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: "700", margin: 0, color: "var(--text-primary)" }}>
            Inventory Management
          </h1>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* User Menu */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontSize: "1.125rem",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            👤
          </button>

          {showUserMenu && (
            <>
              <div onClick={() => setShowUserMenu(false)} style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 40
              }} />
              <div style={{
                position: "absolute",
                top: "52px",
                right: 0,
                width: "240px",
                background: "var(--bg-secondary)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                zIndex: 50,
                animation: "fadeIn 0.2s ease"
              }}>
                <div style={{
                  padding: "1rem",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-tertiary)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{
                      width: "36px",
                      height: "36px",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem"
                    }}>
                      👤
                    </div>
                    <div>
                      <p style={{ fontWeight: "600", margin: 0, fontSize: "0.875rem", color: "var(--text-primary)" }}>Admin User</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>admin@example.com</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "none",
                    background: "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "0.875rem",
                    color: "var(--danger)",
                    transition: "background 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-tertiary)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;