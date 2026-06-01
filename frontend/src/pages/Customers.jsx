import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../api/customerApi";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateCustomer(editingId, formData);
      } else {
        await createCustomer(formData);
      }
      resetForm();
      await loadCustomers();
    } catch (error) {
      alert(error?.response?.data?.detail || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
    setTimeout(() => {
      document.querySelector(".form-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this customer?");
    if (!confirmed) return;
    
    try {
      await deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      alert(error?.response?.data?.detail || "Delete failed");
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.full_name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search)
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.email && c.phone).length;

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
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        
        .form-card {
          transition: all 0.3s ease;
        }
        
        .form-card:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        
        .modern-input {
          transition: all 0.3s ease;
          background: #f9fafb;
        }
        
        .modern-input:focus {
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
        
        .btn-secondary {
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(100, 116, 139, 0.2);
        }
        
        .table-row {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .table-row:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.01) 100%);
          transform: scale(1.002);
        }
        
        .delete-btn {
          transition: all 0.2s ease;
        }
        
        .delete-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
        
        .search-input {
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
        }
        
        .avatar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          animation: pulse 3s infinite;
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
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "8px",
                letterSpacing: "-0.02em"
              }}>
                Customers
              </h1>
              <p style={{ color: "#64748b", fontSize: "15px" }}>
                Manage your customer relationships
              </p>
            </div>

            {/* Stats Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Customers</span>
                  <span style={{ fontSize: "28px" }}>👥</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>{totalCustomers}</div>
                <div style={{ fontSize: "13px", color: "#10b981", marginTop: "8px" }}>
                  ↑ Active customers
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Active Customers</span>
                  <span style={{ fontSize: "28px" }}>✅</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>{activeCustomers}</div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  With complete info
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Customer Growth</span>
                  
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#10b981" }}>
                  +{Math.floor(totalCustomers * 0.2)}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  This month
                </div>
              </div>
            </div>

            {/* Form Section - Premium Design */}
            <div className="form-card form-section" style={{
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
                  {editingId ? "✏️ Edit Customer" : "➕ Add New Customer"}
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="e.g., John Doe"
                      value={formData.full_name}
                      onChange={handleChange}
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

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#475569", marginBottom: "8px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="customer@example.com"
                      value={formData.email}
                      onChange={handleChange}
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

                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#475569", marginBottom: "8px" }}>
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={handleChange}
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

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      color: "white",
                      border: "none",
                      padding: "12px 28px",
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
                      <>⏳ Processing...</>
                    ) : (
                      <>{editingId ? "✏️ Update Customer" : "➕ Add Customer"}</>
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-secondary"
                      style={{
                        background: "white",
                        color: "#64748b",
                        border: "1.5px solid #e2e8f0",
                        padding: "12px 28px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = "#ef4444";
                        e.target.style.color = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.color = "#64748b";
                      }}
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Customers Table Section */}
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                background: "#fafbfc"
              }}>
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#0f172a" }}>
                    Customer Directory
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                    {filteredCustomers.length} customers found
                  </p>
                </div>

                <div style={{ position: "relative", minWidth: "280px" }}>
                  <input
                    type="text"
                    placeholder="🔍 Search by name, email, or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      border: "1.5px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "14px",
                      outline: "none",
                      transition: "all 0.3s ease",
                      background: "white"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
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
                  <p style={{ color: "#64748b" }}>Loading customers...</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Customer</th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Email</th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Phone</th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <tr key={customer.id} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "16px 20px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div className="avatar" style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "12px",
                                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "white",
                                  fontWeight: "600",
                                  fontSize: "16px"
                                }}>
                                  {customer.full_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div style={{ fontWeight: "600", color: "#0f172a", marginBottom: "4px" }}>
                                    {customer.full_name}
                                  </div>
                                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                                    ID: {customer.id.slice(0, 8)}...
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "16px 20px", color: "#475569" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span>📧</span>
                                <span>{customer.email}</span>
                              </span>
                            </td>
                            <td style={{ padding: "16px 20px", color: "#475569" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span>📱</span>
                                <span>{customer.phone}</span>
                              </span>
                            </td>
                            <td style={{ padding: "16px 20px", textAlign: "center" }}>
                              <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                <button
                                  onClick={() => handleEdit(customer)}
                                  style={{
                                    background: "white",
                                    color: "#3b82f6",
                                    border: "1.5px solid #dbeafe",
                                    padding: "6px 16px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "500",
                                    transition: "all 0.2s ease"
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = "#3b82f6";
                                    e.target.style.color = "white";
                                    e.target.style.borderColor = "#3b82f6";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = "white";
                                    e.target.style.color = "#3b82f6";
                                    e.target.style.borderColor = "#dbeafe";
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(customer.id)}
                                  className="delete-btn"
                                  style={{
                                    background: "white",
                                    color: "#ef4444",
                                    border: "1.5px solid #fee2e2",
                                    padding: "6px 16px",
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
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center", padding: "60px 20px" }}>
                            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
                            <p style={{ fontSize: "16px", fontWeight: "500", color: "#0f172a", marginBottom: "4px" }}>
                              No customers found
                            </p>
                            <p style={{ fontSize: "14px", color: "#64748b" }}>
                              {search ? "Try adjusting your search" : "Add your first customer to get started"}
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

export default Customers;