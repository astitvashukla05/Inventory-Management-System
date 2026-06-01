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
  const [isLoading, setIsLoading] = useState(false);

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

  const statsCards = [
    { 
      title: "Total Products", 
      value: products.length, 
      icon: "📦", 
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      trend: "+12%",
      trendUp: true
    },
    { 
      title: "Total Customers", 
      value: customers.length, 
      icon: "👥", 
      color: "#8b5cf6",
      bgGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      trend: "+8%",
      trendUp: true
    },
    { 
      title: "Total Orders", 
      value: orders.length, 
      icon: "🛒", 
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      trend: "+15%",
      trendUp: true
    },
    { 
      title: "Low Stock", 
      value: lowStockProducts.length, 
      icon: "⚠️", 
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      trend: "-5%",
      trendUp: false,
      alert: true
    },
    { 
      title: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString()}`, 
      icon: "💰", 
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      trend: "+23%",
      trendUp: true
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .main-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .stat-card:hover::before {
          left: 100%;
        }
        
        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .table-section {
          transition: all 0.3s ease;
        }
        
        .table-section:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .table-row {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .table-row:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%);
          transform: scale(1.01);
        }
        
        .badge {
          transition: all 0.2s ease;
        }
        
        .badge:hover {
          transform: scale(1.05);
        }
        
        .trend-up {
          animation: pulse 2s infinite;
        }
        
        .revenue-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>

      <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          
          <div className="main-container" style={{ flex: 1, padding: "32px 40px" }}>
            {/* Welcome Header */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <h1 style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "8px",
                    letterSpacing: "-0.02em"
                  }}>
                    Dashboard
                  </h1>
                  <p style={{ color: "#64748b", fontSize: "15px" }}>
                    Welcome back! Here's what's happening with your business today.
                  </p>
                </div>
                <div style={{
                  background: "white",
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{ fontSize: "14px", color: "#64748b" }}>Last updated:</span>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#0f172a" }}>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  border: "3px solid #e2e8f0",
                  borderTopColor: "#3b82f6",
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                  animation: "spin 1s linear infinite"
                }} />
                <p style={{ color: "#64748b" }}>Loading dashboard data...</p>
              </div>
            ) : (
              <>
                {/* Stats Cards Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginBottom: "32px"
                }}>
                  {statsCards.map((stat, index) => (
                    <div
                      key={index}
                      className="stat-card"
                      style={{
                        background: "white",
                        padding: "24px",
                        borderRadius: "20px",
                        border: `1px solid ${stat.color}20`,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                        cursor: "pointer"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                        <div style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          background: `${stat.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "24px"
                        }}>
                          {stat.icon}
                        </div>
                        {stat.trend && (
                          <div style={{
                            padding: "4px 10px",
                            borderRadius: "20px",
                            background: stat.trendUp ? "#d1fae5" : "#fee2e2",
                            color: stat.trendUp ? "#059669" : "#dc2626",
                            fontSize: "12px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px"
                          }}>
                            <span>{stat.trendUp ? "↑" : "↓"}</span>
                            <span>{stat.trend}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
                          {stat.title}
                        </p>
                        <h2 style={{
                          fontSize: "34px",
                          fontWeight: "700",
                          color: stat.title === "Low Stock" && stat.value > 0 ? "#f59e0b" : "#0f172a",
                          marginBottom: "8px"
                        }}>
                          {stat.value}
                        </h2>
                        <div style={{
                          width: "100%",
                          height: "4px",
                          background: `${stat.color}20`,
                          borderRadius: "2px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: `${Math.min(100, (stat.value / 100) * 100)}%`,
                            height: "100%",
                            background: stat.bgGradient,
                            borderRadius: "2px"
                          }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Two Column Layout */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                  gap: "24px",
                  marginBottom: "24px"
                }}>
                  {/* Recent Orders Section */}
                  <div className="table-section" style={{
                    background: "white",
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      padding: "20px 24px",
                      borderBottom: "2px solid #f1f5f9",
                      background: "#fafbfc",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
                          🕒 Recent Orders
                        </h2>
                        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                          Latest 5 orders
                        </p>
                      </div>
                      <button style={{
                        background: "white",
                        border: "1px solid #e2e8f0",
                        padding: "6px 16px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#3b82f6";
                        e.target.style.color = "white";
                        e.target.style.borderColor = "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#0f172a";
                        e.target.style.borderColor = "#e2e8f0";
                      }}>
                        View All →
                      </button>
                    </div>

                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Order ID</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Status</th>
                            <th style={{ padding: "14px 20px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Total</th>
                            <th style={{ padding: "14px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.length > 0 ? (
                            recentOrders.map((order) => {
                              const statusStyle = getStatusColor(order.status);
                              return (
                                <tr key={order.id} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                                  <td style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: "13px", fontWeight: "500", color: "#3b82f6" }}>
                                    #{order.id.slice(0, 8)}...
                                  </td>
                                  <td style={{ padding: "14px 20px" }}>
                                    <span className="badge" style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "6px",
                                      padding: "4px 12px",
                                      borderRadius: "20px",
                                      fontSize: "12px",
                                      fontWeight: "600",
                                      background: statusStyle.bg,
                                      color: statusStyle.text
                                    }}>
                                      <span>{statusStyle.icon}</span>
                                      <span>{order.status}</span>
                                    </span>
                                  </td>
                                  <td style={{ padding: "14px 20px", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>
                                    ₹{order.total_amount?.toLocaleString()}
                                  </td>
                                  <td style={{ padding: "14px 20px", textAlign: "center", fontWeight: "500", color: "#475569" }}>
                                    {order.items?.length || 0}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                <div style={{ fontSize: "48px", marginBottom: "8px" }}>📭</div>
                                <p>No orders found</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Low Stock Products Section */}
                  <div className="table-section" style={{
                    background: "white",
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      padding: "20px 24px",
                      borderBottom: "2px solid #f1f5f9",
                      background: "#fafbfc",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div>
                        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#f59e0b" }}>
                          ⚠️ Low Stock Alert
                        </h2>
                        <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                          Products needing immediate attention
                        </p>
                      </div>
                      {lowStockProducts.length > 0 && (
                        <div style={{
                          background: "#fee2e2",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#dc2626"
                        }}>
                          {lowStockProducts.length} items
                        </div>
                      )}
                    </div>

                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Product Name</th>
                            <th style={{ padding: "14px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>SKU</th>
                            <th style={{ padding: "14px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Stock Level</th>
                            <th style={{ padding: "14px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Status</th>
                           </tr>
                        </thead>
                        <tbody>
                          {lowStockProducts.length > 0 ? (
                            lowStockProducts.map((product) => (
                              <tr key={product.id} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                                <td style={{ padding: "14px 20px", fontWeight: "500", color: "#0f172a" }}>
                                  {product.name}
                                </td>
                                <td style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: "13px", color: "#64748b" }}>
                                  {product.sku}
                                </td>
                                <td style={{ padding: "14px 20px", textAlign: "center" }}>
                                  <span style={{
                                    display: "inline-block",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    fontWeight: "700",
                                    background: product.quantity === 0 ? "#fee2e2" : "#fef3c7",
                                    color: product.quantity === 0 ? "#dc2626" : "#d97706"
                                  }}>
                                    {product.quantity} {product.quantity === 1 ? "unit" : "units"}
                                  </span>
                                </td>
                                <td style={{ padding: "14px 20px", textAlign: "center" }}>
                                  <span style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    color: product.quantity === 0 ? "#dc2626" : "#d97706"
                                  }}>
                                    <span>{product.quantity === 0 ? "❌" : "⚠️"}</span>
                                    <span>{product.quantity === 0 ? "Out of Stock" : "Reorder Soon"}</span>
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                <div style={{ fontSize: "48px", marginBottom: "8px" }}>✅</div>
                                <p>All products are well stocked!</p>
                                <p style={{ fontSize: "13px", marginTop: "4px" }}>No low stock items to display</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

         
                
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;