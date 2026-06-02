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
  const [selectedOrder, setSelectedOrder] = useState(null);
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
      PENDING: { bg: "rgba(245, 158, 11, 0.15)", color: "#fbbf24", icon: "⏳" },
      PROCESSING: { bg: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", icon: "🔄" },
      SHIPPED: { bg: "rgba(139, 92, 246, 0.15)", color: "#a78bfa", icon: "📦" },
      DELIVERED: { bg: "rgba(16, 185, 129, 0.15)", color: "#34d399", icon: "✅" },
      CANCELLED: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", icon: "❌" },
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
        border: `1px solid ${style.color}30`,
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
    try {
      await deleteOrder(id);
      await loadData();
    } catch (error) {
      alert(error?.response?.data?.detail || "Failed to delete order");
    }
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
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)" }}>{orders.length}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Revenue</span>
                <span style={{ fontSize: "1.5rem" }}>💰</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "var(--text-primary)" }}>₹{totalRevenue.toLocaleString()}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Pending Orders</span>
                <span style={{ fontSize: "1.5rem" }}>⏳</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#fbbf24" }}>{pendingOrders}</h2>
            </div>
          </div>

          {/* Create Order Form */}
          <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.25rem", color: "var(--text-primary)" }}>
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
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "var(--text-primary)" }}>Orders List</h2>
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
                          <td style={{ fontWeight: "500", color: "var(--text-primary)" }}>{getCustomerName(order.customer_id)}</td>
                          <td>
                            {order.items?.map((item) => (
                              <div key={item.id} style={{ fontSize: "0.75rem", marginBottom: "0.25rem", color: "var(--text-secondary)" }}>
                                • {getProductName(item.product_id)} × {item.quantity}
                              </div>
                            ))}
                          </td>
                          <td style={{ fontWeight: "600", color: "var(--text-primary)" }}>₹{order.total_amount?.toLocaleString()}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              style={{
                                padding: "0.375rem 0.75rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                                background: "var(--bg-tertiary)",
                                color: "var(--text-primary)",
                                border: `1px solid var(--border)`,
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
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                              <button
                                type="button"
                                className="btn-primary"
                                onClick={() => setSelectedOrder(order)}
                                style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                className="btn-danger"
                                onClick={() => handleDelete(order.id)}
                                style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}
                              >
                                Delete
                              </button>
                            </div>
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

      {/* Modern Order Details Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease",
            padding: "1rem",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-2xl)",
              width: "500px",
              maxWidth: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-2xl)",
              animation: "fadeInUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: "1.5rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-tertiary)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
              }}>
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  padding: "0.25rem",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-hover)";
                  e.currentTarget.style.color = "var(--danger)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "1.5rem" }}>
              {/* Order ID */}
              <div style={{ marginBottom: "1.25rem", background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "var(--radius-lg)" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Order ID
                </p>
                <p style={{
                  fontWeight: "600",
                  color: "var(--primary)",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  wordBreak: "break-all",
                }}>
                  {selectedOrder.id}
                </p>
              </div>

              {/* Two Column Layout */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}>
                <div style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "var(--radius-lg)" }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Customer
                  </p>
                  <p style={{ fontWeight: "500", color: "var(--text-primary)", fontSize: "0.875rem" }}>
                    {getCustomerName(selectedOrder.customer_id)}
                  </p>
                </div>
                <div style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "var(--radius-lg)" }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Status
                  </p>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
              </div>

              {/* Total Amount */}
              <div style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                padding: "1rem",
                borderRadius: "var(--radius-lg)",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}>
                <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.8)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Total Amount
                </p>
                <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "white", margin: 0 }}>
                  ₹{selectedOrder.total_amount?.toLocaleString()}
                </p>
              </div>

              {/* Products Section */}
              <div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <span>📦</span> Products Ordered
                </h3>
                <div style={{
                  background: "var(--bg-tertiary)",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}>
                  {selectedOrder.items?.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "1rem",
                        borderBottom: index !== selectedOrder.items.length - 1 ? "1px solid var(--border)" : "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                          {getProductName(item.product_id)}
                        </p>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                          ID: {item.product_id?.slice(0, 8)}...
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span className="badge badge-info" style={{ fontSize: "0.875rem", fontWeight: "600" }}>
                          × {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid var(--border)",
              background: "var(--bg-tertiary)",
            }}>
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-primary"
                style={{ width: "100%", padding: "0.75rem" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

export default Orders;