import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../api/orderApi";
import { getCustomers } from "../api/customerApi";
import { getProducts } from "../api/productApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const ordersData = await getOrders();
      const customersData = await getCustomers();
      const productsData = await getProducts();
      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.full_name : "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : "Unknown";
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrder(orderId, { status });
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.detail || "Failed to update order");
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createOrder({
        customer_id: customerId,
        items: [{ product_id: productId, quantity: Number(quantity) }],
      });
      setCustomerId("");
      setProductId("");
      setQuantity("");
      await loadData();
      alert("Order created successfully");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) return;
    await deleteProduct(id);
    await loadData();
  };

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;

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
              Orders
            </h1>
            <p style={{ color: "var(--text-muted)" }}>Manage and track customer orders</p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Orders</span>
                <span style={{ fontSize: "1.5rem" }}>📋</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>{orders.length}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Revenue</span>
                <span style={{ fontSize: "1.5rem" }}>💰</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>₹{totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Pending Orders</span>
                <span style={{ fontSize: "1.5rem" }}>⏳</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#f59e0b" }}>{pendingOrders}</h2>
            </div>
          </div>

          {/* Create Order Form */}
          <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.25rem" }}>
              🛒 Create New Order
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}>
                <select className="input-modern" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.full_name}
                    </option>
                  ))}
                </select>
                <select className="input-modern" value={productId} onChange={(e) => setProductId(e.target.value)} required>
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} | Stock: {product.quantity}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="input-modern"
                  min="1"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating Order..." : "Create Order"}
              </button>
            </form>
          </div>

          {/* Orders Table */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>Orders List</h2>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{orders.length} total orders</p>
            </div>

            {isLoading ? (
              <div style={{ padding: "3rem", textAlign: "center" }}>
                <div className="spinner" style={{ margin: "0 auto" }}></div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="table-modern">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id}>
                          <td style={{ fontWeight: "500" }}>{getCustomerName(order.customer_id)}</td>
                          <td>
                            {order.items?.map((item) => (
                              <div key={item.id} style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                                • {getProductName(item.product_id)} × {item.quantity}
                              </div>
                            ))}
                          </td>
                          <td style={{ fontWeight: "600" }}>₹{order.total_amount?.toLocaleString()}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              style={{
                                padding: "0.375rem 0.75rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                background: getStatusBadge(order.status).props.style.background,
                                color: getStatusBadge(order.status).props.style.color,
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <option value="PENDING">⏳ PENDING</option>
                              <option value="PROCESSING">🔄 PROCESSING</option>
                              <option value="SHIPPED">📦 SHIPPED</option>
                              <option value="DELIVERED">✅ DELIVERED</option>
                              <option value="CANCELLED">❌ CANCELLED</option>
                            </select>
                          </td>
                          <td>
                            <button className="btn-danger" onClick={() => handleDelete(order.id)} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                          📭 No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;