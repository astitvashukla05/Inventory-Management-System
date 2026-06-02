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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

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

  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const lowStockCount = products.filter(p => p.quantity < 10).length;

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
              Products
            </h1>
            <p style={{ color: "var(--text-muted)" }}>Manage your product inventory</p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Products</span>
                <span style={{ fontSize: "1.5rem" }}>📦</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>{products.length}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Value</span>
                <span style={{ fontSize: "1.5rem" }}>💰</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>₹{totalValue.toLocaleString()}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Low Stock</span>
                <span style={{ fontSize: "1.5rem" }}>⚠️</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#f59e0b" }}>{lowStockCount}</h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.25rem" }}>
              {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}>
                <input
                  type="text"
                  name="name"
                  className="input-modern"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="sku"
                  className="input-modern"
                  placeholder="SKU Number"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  className="input-modern"
                  placeholder="Price (₹)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  className="input-modern"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : (editingId ? "Update Product" : "Add Product")}
                </button>
                {editingId && (
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products Table */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
              <div>
                <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>Product Inventory</h2>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {filteredProducts.length} products found
                </p>
              </div>
              <input
                type="text"
                className="input-modern"
                placeholder="🔍 Search by name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "280px" }}
              />
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
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id}>
                          <td style={{ fontWeight: "500" }}>{product.name}</td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{product.sku}</td>
                          <td style={{ fontWeight: "600" }}>₹{product.price.toLocaleString()}</td>
                          <td>
                            <span className={`badge ${product.quantity < 10 ? 'badge-warning' : 'badge-success'}`}>
                              {product.quantity} units
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button className="btn-primary" onClick={() => handleEdit(product)} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>
                                Edit
                              </button>
                              <button className="btn-danger" onClick={() => handleDelete(product.id)} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                          📭 No products found
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

export default Products;