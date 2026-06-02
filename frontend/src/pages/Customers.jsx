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
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
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
              Customers
            </h1>
            <p style={{ color: "var(--text-muted)" }}>Manage your customer relationships</p>
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
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total Customers</span>
                <span style={{ fontSize: "1.5rem" }}>👥</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>{customers.length}</h2>
            </div>
            <div className="card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Active Customers</span>
                <span style={{ fontSize: "1.5rem" }}>✅</span>
              </div>
              <h2 style={{ fontSize: "1.875rem", fontWeight: "700" }}>{customers.filter(c => c.email && c.phone).length}</h2>
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1.25rem" }}>
              {editingId ? "✏️ Edit Customer" : "➕ Add New Customer"}
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
                  name="full_name"
                  className="input-modern"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="input-modern"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  className="input-modern"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : (editingId ? "Update Customer" : "Add Customer")}
                </button>
                {editingId && (
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Customers Table */}
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
                <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>Customer Directory</h2>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {filteredCustomers.length} customers found
                </p>
              </div>
              <input
                type="text"
                className="input-modern"
                placeholder="🔍 Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "300px" }}
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
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <div style={{
                                width: "36px",
                                height: "36px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "0.875rem",
                              }}>
                                {customer.full_name.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontWeight: "500" }}>{customer.full_name}</span>
                            </div>
                          </td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <button className="btn-primary" onClick={() => handleEdit(customer)} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>
                                Edit
                              </button>
                              <button className="btn-danger" onClick={() => handleDelete(customer.id)} style={{ padding: "0.375rem 0.75rem", fontSize: "0.75rem" }}>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                          📭 No customers found
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

export default Customers;