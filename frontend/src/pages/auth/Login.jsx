import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "var(--bg-primary)",
      padding: "1rem",
    }}>
      <div className="card" style={{
        maxWidth: "420px",
        width: "100%",
        padding: "2rem",
        animation: "fadeIn 0.3s ease",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            fontSize: "2rem",
          }}>
            📦
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "0.5rem", color: "var(--text-primary)" }}>
            Welcome Back
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Sign in to access your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              name="email"
              className="input-modern"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem", position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input-modern"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "2.5rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.125rem",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.75rem" }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: "600", color: "var(--primary)" }}>
              Create Account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;