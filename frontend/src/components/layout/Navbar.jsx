import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .navbar-container {
          animation: slideDown 0.5s ease-out;
          backdrop-filter: blur(10px);
        }
        
        .logout-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        
        .logout-btn:active {
          transform: translateY(0);
        }
        
        .logout-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .logout-btn:hover::before {
          width: 200px;
          height: 200px;
        }
        
        .user-avatar {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .dropdown-menu {
          animation: fadeIn 0.2s ease-out;
          transform-origin: top right;
        }
        
        .dropdown-item {
          transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
          padding-left: 20px;
        }
        
        .time-badge {
          animation: pulse 2s infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="navbar-container" style={{
        height: "70px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        
        {/* Left Section - Brand */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          {/* Logo */}
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)"
          }}>
            📦
          </div>
          
          {/* Brand Text */}
          <div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              letterSpacing: "-0.02em"
            }}>
              Inventory Management
            </h2>
            <p style={{
              fontSize: "11px",
              color: "#64748b",
              margin: 0,
              marginTop: "2px",
              fontWeight: "500"
            }}>
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Right Section - User Info & Actions */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}>
          
          {/* Date & Time */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "2px"
          }}>
            <div className="time-badge" style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#f1f5f9",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#0f172a"
            }}>
              <span>🕐</span>
              <span>{formatTime()}</span>
            </div>
            <div style={{
              fontSize: "11px",
              color: "#64748b",
              fontWeight: "500"
            }}>
              {formatDate()}
            </div>
          </div>

          {/* Notification Bell */}
          <div style={{
            position: "relative",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
            <span style={{
              fontSize: "22px"
            }}>
              🔔
            </span>
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              background: "#ef4444",
              borderRadius: "50%",
              border: "2px solid white"
            }} />
          </div>

          {/* User Menu */}
          <div style={{ position: "relative" }}>
            <div
              className="user-avatar"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >
              👤
            </div>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div 
                  onClick={() => setShowUserMenu(false)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99
                  }}
                />
                <div className="dropdown-menu" style={{
                  position: "absolute",
                  top: "54px",
                  right: "0",
                  width: "240px",
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  zIndex: 100
                }}>
                  {/* User Info */}
                  <div style={{
                    padding: "16px",
                    borderBottom: "1px solid #f1f5f9",
                    background: "#fafbfc"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px"
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px"
                      }}>
                        👤
                      </div>
                      <div>
                        <p style={{
                          fontWeight: "600",
                          color: "#0f172a",
                          margin: 0,
                          fontSize: "14px"
                        }}>
                          Admin User
                        </p>
                        <p style={{
                          fontSize: "11px",
                          color: "#64748b",
                          margin: 0,
                          marginTop: "2px"
                        }}>
                          admin@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div>
                    <div className="dropdown-item" style={{
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderBottom: "1px solid #f1f5f9"
                    }}
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to profile page (if exists)
                    }}>
                      <span style={{ fontSize: "18px" }}>👤</span>
                      <span style={{ fontSize: "14px", color: "#475569" }}>Profile Settings</span>
                    </div>
                    
                    <div className="dropdown-item" style={{
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderBottom: "1px solid #f1f5f9"
                    }}
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to settings page (if exists)
                    }}>
                      <span style={{ fontSize: "18px" }}>⚙️</span>
                      <span style={{ fontSize: "14px", color: "#475569" }}>Settings</span>
                    </div>
                    
                    <div className="dropdown-item" style={{
                      padding: "12px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}>
                      <span style={{ fontSize: "18px" }}>🚪</span>
                      <span style={{ fontSize: "14px", color: "#ef4444", fontWeight: "500" }}>Logout</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Logout Button (Alternative) */}
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "white",
              border: "none",
              padding: "8px 20px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)"
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;