import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const getStyle = (path) => ({
    padding: "14px",
    borderRadius: "10px",
    color: "white",
    marginBottom: "10px",
    backgroundColor:
      location.pathname === path
        ? "#2563eb"
        : "transparent",
    display: "block",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        width: "260px",
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#0f172a",
        padding: "20px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "30px",
        }}
      >
        Navigation
      </h2>

      <Link
        to="/"
        style={getStyle("/")}
      >
        Dashboard
      </Link>

      <Link
        to="/products"
        style={getStyle("/products")}
      >
        Products
      </Link>

      <Link
        to="/customers"
        style={getStyle("/customers")}
      >
        Customers
      </Link>

      <Link
        to="/orders"
        style={getStyle("/orders")}
      >
        Orders
      </Link>
    </div>
  );
}

export default Sidebar;