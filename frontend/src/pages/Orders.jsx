import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import toast from "react-hot-toast";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../api/orderApi";
import {
  getCustomers,
} from "../api/customerApi";
import {
  getProducts,
} from "../api/productApi";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return { bg: "#fef3c7", text: "#d97706", icon: "⏳" };
      case "PROCESSING": return { bg: "#dbeafe", text: "#2563eb", icon: "🔄" };
      case "SHIPPED": return { bg: "#ede9fe", text: "#7c3aed", icon: "📦" };
      case "DELIVERED": return { bg: "#d1fae5", text: "#059669", icon: "✅" };
      case "CANCELLED": return { bg: "#fee2e2", text: "#dc2626", icon: "❌" };
      default: return { bg: "#f1f5f9", text: "#64748b", icon: "📋" };
    }
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
      toast.success(
  "Order created successfully"
);
    } catch (error) {
      toast.error(
  error.response?.data
    ?.detail ||
    "Failed to create order"
);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) return;
    await deleteOrder(id);
    await loadData();
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "PENDING").length;
  const deliveredOrders = orders.filter(o => o.status === "DELIVERED").length;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .main-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .form-card {
          transition: all 0.3s ease;
        }
        
        .form-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        
        .modern-select, .modern-input {
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        
        .modern-select:focus, .modern-input:focus {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
        }
        
        .btn-primary {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }
        
        .table-row {
          transition: all 0.2s ease;
        }
        
        .table-row:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.01) 100%);
          transform: scale(1.002);
        }
        
        .status-badge {
          transition: all 0.2s ease;
        }
        
        .status-badge:hover {
          transform: scale(1.05);
        }
        
        .delete-btn {
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          
          <div className="main-container" style={{ flex: 1, padding: "32px 40px" }}>
            {/* Header Section */}
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}>
                Orders
              </h1>
              <p style={{ color: "#64748b", fontSize: "15px" }}>
                Manage and track customer orders
              </p>
            </div>

            {/* Stats Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "32px"
            }}>
              <div className="stat-card" style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Orders</span>
                  <span style={{ fontSize: "28px" }}>📋</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>{totalOrders}</div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  All time orders
                </div>
              </div>

              <div className="stat-card" style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Revenue</span>
                  <span style={{ fontSize: "28px" }}>💰</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  From all orders
                </div>
              </div>

              <div className="stat-card" style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Pending Orders</span>
                  <span style={{ fontSize: "28px" }}>⏳</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#f59e0b" }}>{pendingOrders}</div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  Awaiting processing
                </div>
              </div>

              <div className="stat-card" style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Delivered</span>
                  <span style={{ fontSize: "28px" }}>🎯</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#10b981" }}>{deliveredOrders}</div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  Completed orders
                </div>
              </div>
            </div>

            {/* Create Order Form - Premium Design */}
            <div className="form-card" style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              marginBottom: "32px",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "20px 28px",
                borderBottom: "2px solid #f1f5f9",
                background: "#fafbfc"
              }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#0f172a" }}>
                  🛒 Create New Order
                </h2>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginBottom: "28px"
                }}>
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#475569", marginBottom: "8px" }}>
                      Customer *
                    </label>
                    <select
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      required
                      className="modern-select"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "14px",
                        outline: "none",
                        background: "#f9fafb",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    >
                      <option value="">👤 Select Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.full_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#475569", marginBottom: "8px" }}>
                      Product *
                    </label>
                    <select
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      required
                      className="modern-select"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "14px",
                        outline: "none",
                        background: "#f9fafb",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    >
                      <option value="">📦 Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} | Stock: {product.quantity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#475569", marginBottom: "8px" }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      className="modern-input"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1.5px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                      onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                    color: "white",
                    border: "none",
                    padding: "12px 32px",
                    borderRadius: "12px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>⏳ Creating Order...</>
                  ) : (
                    <>🛒 Create Order</>
                  )}
                </button>
              </form>
            </div>

            {/* Orders Table Section */}
            <div style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden"
            }}>
              <div style={{
                padding: "20px 28px",
                borderBottom: "2px solid #f1f5f9",
                background: "#fafbfc"
              }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
                    Orders List
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                    {orders.length} total orders
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div style={{ padding: "60px", textAlign: "center" }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    border: "3px solid #e2e8f0",
                    borderTopColor: "#3b82f6",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    animation: "spin 1s linear infinite"
                  }} />
                  <p style={{ color: "#64748b" }}>Loading orders...</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Customer</th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Products</th>
                        <th style={{ padding: "16px 20px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Amount</th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Status</th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders.map((order) => {
                          const statusStyle = getStatusColor(order.status);
                          return (
                            <tr key={order.id} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "16px 20px", fontWeight: "500", color: "#0f172a" }}>
                                {getCustomerName(order.customer_id)}
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                {order.items?.map((item) => (
                                  <div key={item.id} style={{
                                    fontSize: "14px",
                                    color: "#475569",
                                    marginBottom: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                  }}>
                                    <span>•</span>
                                    <span>{getProductName(item.product_id)}</span>
                                    <span style={{ fontWeight: "600", color: "#3b82f6" }}>× {item.quantity}</span>
                                  </div>
                                ))}
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>
                                ₹{order.total_amount?.toLocaleString()}
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                <select
                                  value={order.status}
                                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                  className="status-badge"
                                  style={{
                                    padding: "6px 12px",
                                    borderRadius: "20px",
                                    border: `2px solid ${statusStyle.text}30`,
                                    background: statusStyle.bg,
                                    color: statusStyle.text,
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                    outline: "none",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  <option value="PENDING">⏳ PENDING</option>
                                  <option value="PROCESSING">🔄 PROCESSING</option>
                                  <option value="SHIPPED">📦 SHIPPED</option>
                                  <option value="DELIVERED">✅ DELIVERED</option>
                                  <option value="CANCELLED">❌ CANCELLED</option>
                                </select>
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                <button
                                  onClick={() => handleDelete(order.id)}
                                  className="delete-btn"
                                  style={{
                                    background: "white",
                                    color: "#ef4444",
                                    border: "1.5px solid #fee2e2",
                                    padding: "6px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    transition: "all 0.2s ease"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = "#ef4444";
                                    e.target.style.color = "white";
                                    e.target.style.borderColor = "#ef4444";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = "white";
                                    e.target.style.color = "#ef4444";
                                    e.target.style.borderColor = "#fee2e2";
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center", padding: "60px 20px" }}>
                            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
                            <p style={{ fontSize: "16px", fontWeight: "500", color: "#0f172a", marginBottom: "4px" }}>
                              No orders found
                            </p>
                            <p style={{ fontSize: "14px", color: "#64748b" }}>
                              Create your first order to get started
                            </p>
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
      </div>
    </>
  );
}

export default Orders;