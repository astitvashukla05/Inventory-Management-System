import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      price: "",
      quantity: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        sku: formData.sku,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      alert(error?.response?.data?.detail || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });
    setTimeout(() => {
      document.querySelector(".form-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      alert(error?.response?.data?.detail || "Delete failed");
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: "Out of Stock", color: "#ef4444", icon: "❌" };
    if (quantity < 10) return { label: "Low Stock", color: "#f59e0b", icon: "⚠️" };
    if (quantity < 50) return { label: "In Stock", color: "#10b981", icon: "✅" };
    return { label: "Well Stocked", color: "#3b82f6", icon: "📦" };
  };

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

        .stock-badge {
          transition: all 0.2s ease;
        }

        .stock-badge:hover {
          transform: scale(1.05);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        .ripple-effect {
          position: relative;
          overflow: hidden;
        }

        .ripple-effect:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .ripple-effect:active:after {
          width: 100px;
          height: 100px;
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
                Products
              </h1>
              <p style={{ color: "#64748b", fontSize: "15px" }}>
                Manage and track your product inventory
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Products</span>
                  <span style={{ fontSize: "28px" }}>📦</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>{products.length}</div>
                <div style={{ fontSize: "13px", color: "#10b981", marginTop: "8px" }}>
                  ↑ Active inventory
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Total Value</span>
                  <span style={{ fontSize: "28px" }}>💰</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>
                  ₹{products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  Inventory value
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Low Stock Items</span>
                  <span style={{ fontSize: "28px" }}>⚠️</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#f59e0b" }}>
                  {products.filter(p => p.quantity < 10).length}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  Need reorder
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
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>Categories</span>
                  <span style={{ fontSize: "28px" }}>🏷️</span>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>
                  {new Set(products.map(p => p.sku?.split('-')[0])).size || 1}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "8px" }}>
                  Product types
                </div>
              </div>
            </div>

            {/* Form Section - Premium Design */}
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
                  {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
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
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g., Wireless Mouse"
                      value={formData.name}
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
                      SKU Number *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      placeholder="e.g., SKU-001"
                      value={formData.sku}
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
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
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
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0"
                      value={formData.quantity}
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
                      <>{editingId ? "✏️ Update Product" : "➕ Add Product"}</>
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

            {/* Products Table Section */}
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
                    Product Inventory
                  </h2>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
                    {filteredProducts.length} items found
                  </p>
                </div>

                <div style={{ position: "relative", minWidth: "280px" }}>
                  <input
                    type="text"
                    placeholder="🔍 Search by name or SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
                  <style>{`
                    @keyframes spin {
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                  <p style={{ color: "#64748b" }}>Loading products...</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Product</th>
                        <th style={{ padding: "16px 20px", textAlign: "left", fontSize: "13px", fontWeight: "600", color: "#475569" }}>SKU</th>
                        <th style={{ padding: "16px 20px", textAlign: "right", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Price</th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Stock</th>
                        <th style={{ padding: "16px 20px", textAlign: "center", fontSize: "13px", fontWeight: "600", color: "#475569" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                          const stockStatus = getStockStatus(product.quantity);
                          return (
                            <tr key={product.id} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                              <td style={{ padding: "16px 20px", fontWeight: "500", color: "#0f172a" }}>
                                {product.name}
                              </td>
                              <td style={{ padding: "16px 20px", fontFamily: "monospace", fontSize: "13px", color: "#64748b" }}>
                                {product.sku}
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "right", fontWeight: "600", color: "#0f172a" }}>
                                ₹{product.price.toLocaleString()}
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                <span className="stock-badge" style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  padding: "4px 12px",
                                  borderRadius: "20px",
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  background: `${stockStatus.color}15`,
                                  color: stockStatus.color,
                                  border: `1px solid ${stockStatus.color}30`
                                }}>
                                  <span>{stockStatus.icon}</span>
                                  <span>{product.quantity} units</span>
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "center" }}>
                                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                  <button
                                    onClick={() => handleEdit(product)}
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
                                    onClick={() => handleDelete(product.id)}
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
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center", padding: "60px 20px" }}>
                            <div style={{ fontSize: "64px", marginBottom: "16px" }}>📭</div>
                            <p style={{ fontSize: "16px", fontWeight: "500", color: "#0f172a", marginBottom: "4px" }}>
                              No products found
                            </p>
                            <p style={{ fontSize: "14px", color: "#64748b" }}>
                              {search ? "Try adjusting your search" : "Add your first product to get started"}
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

export default Products;