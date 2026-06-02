import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", name: "Dashboard", icon: "📊" },
    { path: "/products", name: "Products", icon: "📦" },
    { path: "/customers", name: "Customers", icon: "👥" },
    { path: "/orders", name: "Orders", icon: "🛒" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={{
      width: "260px",
      minHeight: "calc(100vh - 64px)",
      background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
      padding: "1.5rem",
      position: "sticky",
      top: "64px",
    }}>
      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "all 0.2s ease",
              background: isActive(item.path) ? "rgba(59, 130, 246, 0.2)" : "transparent",
              borderLeft: isActive(item.path) ? "3px solid var(--primary)" : "3px solid transparent",
              color: isActive(item.path) ? "white" : "#94a3b8",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile Section */}
      <div style={{
        marginTop: "2rem",
        padding: "1rem",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.125rem"
          }}>
            👤
          </div>
          <div>
            <p style={{ color: "white", fontSize: "0.875rem", fontWeight: "600", margin: 0 }}>
              Admin User
            </p>
            <p style={{ color: "#94a3b8", fontSize: "0.75rem", margin: 0 }}>
              admin@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;