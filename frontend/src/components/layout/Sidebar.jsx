import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/", name: "Dashboard", icon: "📊" },
    { path: "/products", name: "Products", icon: "📦" },
    { path: "/customers", name: "Customers", icon: "👥" },
    { path: "/orders", name: "Orders", icon: "🛒" },
  ];

  const getStyle = (path) => ({
    padding: "12px 16px",
    borderRadius: "12px",
    color: "#e2e8f0",
    marginBottom: "8px",
    backgroundColor: location.pathname === path ? "rgba(59, 130, 246, 0.2)" : "transparent",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.3s ease",
    borderLeft: location.pathname === path ? "3px solid #3b82f6" : "3px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
  });

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .sidebar-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .sidebar-item:hover {
          background: rgba(59, 130, 246, 0.15);
          transform: translateX(4px);
          padding-left: 20px !important;
        }
        
        .sidebar-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: left 0.5s;
        }
        
        .sidebar-item:hover::before {
          left: 100%;
        }
        
        .sidebar-logo {
          animation: slideIn 0.5s ease-out;
        }
        
        .menu-icon {
          transition: all 0.3s ease;
        }
        
        .sidebar-item:hover .menu-icon {
          transform: scale(1.1);
        }
        
        .active-indicator {
          animation: glow 2s ease-in-out infinite;
        }
        
        .collapse-btn {
          transition: all 0.3s ease;
        }
        
        .collapse-btn:hover {
          transform: scale(1.1);
          background: rgba(59, 130, 246, 0.2);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: auto; }
        }
        
        .menu-text {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <div style={{
        width: isCollapsed ? "80px" : "260px",
        minHeight: "calc(100vh - 70px)",
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        padding: isCollapsed ? "20px 12px" : "24px 20px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
      }}>
        
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="collapse-btn"
          style={{
            position: "absolute",
            right: "-12px",
            top: "30px",
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: "#3b82f6",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            zIndex: 10,
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
          }}
        >
          {isCollapsed ? "→" : "←"}
        </button>

        {/* Logo/Brand Section */}
        <div className="sidebar-logo" style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "40px",
          padding: isCollapsed ? "0" : "0 8px",
          justifyContent: isCollapsed ? "center" : "flex-start"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
          }}>
            📦
          </div>
          {!isCollapsed && (
            <div>
              <h2 style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                margin: 0,
                letterSpacing: "-0.02em"
              }}>
                Inventory
              </h2>
              <p style={{
                color: "#94a3b8",
                fontSize: "10px",
                margin: 0,
                marginTop: "2px"
              }}>
                Management System
              </p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="sidebar-item"
                style={{
                  ...getStyle(item.path),
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  padding: isCollapsed ? "12px" : "12px 16px",
                  position: "relative"
                }}
              >
                <span className="menu-icon" style={{
                  fontSize: "20px",
                  minWidth: "24px",
                  textAlign: "center"
                }}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="menu-text" style={{
                    flex: 1,
                    whiteSpace: "nowrap"
                  }}>
                    {item.name}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <span className="active-indicator" style={{
                    width: "6px",
                    height: "6px",
                    background: "#3b82f6",
                    borderRadius: "50%",
                    position: "absolute",
                    right: "16px"
                  }} />
                )}
              </Link>
            );
          })}
        </div>

        {/* User Profile Section (Optional) */}
        {!isCollapsed && (
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "20px",
            right: "20px",
            padding: "16px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                👤
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  margin: 0
                }}>
                  Admin User
                </p>
                <p style={{
                  color: "#94a3b8",
                  fontSize: "10px",
                  margin: 0,
                  marginTop: "2px"
                }}>
                  admin@example.com
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Icon */}
        {isCollapsed && (
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            cursor: "pointer"
          }}>
            👤
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;