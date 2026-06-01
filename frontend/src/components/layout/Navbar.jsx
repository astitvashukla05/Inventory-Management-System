import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "70px",
        backgroundColor: "white",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "22px",
            color: "#0f172a",
          }}
        >
          Inventory Management
        </h2>

        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
          }}
        >
          Admin Dashboard
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          fontWeight: "600",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;