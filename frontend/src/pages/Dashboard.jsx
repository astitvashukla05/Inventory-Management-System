import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";
import { getOrders } from "../api/orderApi";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const productsData = await getProducts();
      const customersData = await getCustomers();
      const ordersData = await getOrders();
      setProducts(productsData);
      setCustomers(customersData);
      setOrders(ordersData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const lowStockProducts = products.filter((product) => product.quantity < 10);
  const recentOrders = [...orders].reverse().slice(0, 5);
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);

  const statsCards = [
    { title: "Total Products", value: products.length, icon: "📦", color: "#3b82f6", change: "+12%" },
    { title: "Total Customers", value: customers.length, icon: "👥", color: "#8b5cf6", change: "+8%" },
    { title: "Total Orders", value: orders.length, icon: "🛒", color: "#10b981", change: "+15%" },
    { title: "Low Stock", value: lowStockProducts.length, icon: "⚠️", color: "#f59e0b", change: "-5%" },
    { title: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: "💰", color: "#10b981", change: "+23%" },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: { bg: "#fef3c7", color: "#d97706", icon: "⏳" },
      PROCESSING: { bg: "#dbeafe", color: "#2563eb", icon: "🔄" },
      SHIPPED: { bg: "#ede9fe", color: "#7c3aed", icon: "📦" },
      DELIVERED: { bg: "#d1fae5", color: "#059669", icon: "✅" },
      CANCELLED: { bg: "#fee2e2", color: "#dc2626", icon: "❌" },
    };
    const style = styles[status] || styles.PENDING;
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.25rem 0.75rem",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "600",
        background: style.bg,
        color: style.color,
      }}>
        {style.icon} {status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1, padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="spinner" style={{ width: "48px", height: "48px" }}></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "2rem", animation: "fadeIn 0.3s ease" }}>
          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
            }}>
              Dashboard
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}>
            {statsCards.map((stat, idx) => (
              <div key={idx} className="card" style={{ padding: "1.5rem", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    background: `${stat.color}10`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}>
                    {stat.icon}
                  </div>
                  {stat.change && (
                    <span style={{
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: stat.change.startsWith("+") ? "#10b981" : "#ef4444",
                      background: stat.change.startsWith("+") ? "#d1fae5" : "#fee2e2",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                    }}>
                      {stat.change}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  {stat.title}
                </p>
                <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)" }}>
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Recent Orders & Low Stock */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "1.5rem",
          }}>
            {/* Recent Orders */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                  🕒 Recent Orders
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  Latest 5 orders
                </p>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
                            #{order.id.slice(0, 8)}...
                          </td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td style={{ fontWeight: "600" }}>₹{order.total_amount?.toLocaleString()}</td>
                          <td>{order.items?.length || 0}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          📭 No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.25rem", color: "#f59e0b" }}>
                  ⚠️ Low Stock Alert
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  Products needing immediate attention
                </p>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>SKU</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map((product) => (
                        <tr key={product.id}>
                          <td style={{ fontWeight: "500" }}>{product.name}</td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{product.sku}</td>
                          <td>
                            <span className="badge badge-danger">
                              {product.quantity} units left
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                          ✅ All products are well stocked!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;