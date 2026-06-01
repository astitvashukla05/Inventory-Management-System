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
  const [rememberMe, setRememberMe] = useState(false);

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
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load remembered email on mount
  useState(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .login-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .login-card {
          animation: slideInRight 0.5s ease-out;
          transition: all 0.3s ease;
        }
        
        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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
        
        .submit-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        
        .submit-btn:active {
          transform: translateY(0);
        }
        
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .submit-btn:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        
        .input-wrapper:focus-within .input-icon {
          color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
        }
        
        .toggle-password {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #94a3b8;
          transition: all 0.3s ease;
        }
        
        .toggle-password:hover {
          color: #3b82f6;
          transform: translateY(-50%) scale(1.1);
        }
        
        .link-hover {
          transition: all 0.3s ease;
          position: relative;
        }
        
        .link-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: width 0.3s ease;
        }
        
        .link-hover:hover::after {
          width: 100%;
        }
        
        .checkbox-custom {
          transition: all 0.2s ease;
        }
        
        .checkbox-custom:hover {
          transform: scale(1.05);
        }
        
        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }
        
        .decorative-circle {
          animation: pulse 3s infinite;
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Animated decorative elements */}
        <div className="decorative-circle" style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: "pulse 3s infinite"
        }} />
        <div className="decorative-circle floating-shape" style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: "pulse 4s infinite"
        }} />
        <div className="floating-shape" style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "100px",
          height: "100px",
          borderRadius: "30%",
          background: "rgba(255,255,255,0.05)",
          transform: "rotate(45deg)"
        }} />
        <div className="floating-shape" style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "40%",
          background: "rgba(255,255,255,0.05)",
          transform: "rotate(60deg)",
          animationDelay: "2s"
        }} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          transform: "translate(-50%, -50%)"
        }} />

        <div className="login-card" style={{
          width: "460px",
          background: "white",
          padding: "48px",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          zIndex: 1
        }}>
          {/* Logo/Brand Section */}
          <div style={{
            textAlign: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "36px",
              boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
            }}>
              📦
            </div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "8px",
              letterSpacing: "-0.02em"
            }}>
              Welcome Back
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Sign in to access your inventory
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="input-wrapper" style={{ position: "relative", marginBottom: "20px" }}>
              <span className="input-icon" style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "18px"
              }}>
                📧
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="modern-input"
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "14px",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  background: "#f9fafb"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* Password Field */}
            <div className="input-wrapper" style={{ position: "relative", marginBottom: "16px" }}>
              <span className="input-icon" style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "18px"
              }}>
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="modern-input"
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "14px",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  background: "#f9fafb",
                  paddingRight: "44px"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: "18px",
                  transition: "all 0.3s ease"
                }}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "13px",
                color: "#64748b"
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-custom"
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    accentColor: "#667eea"
                  }}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="link-hover"
                style={{
                  fontSize: "13px",
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: "500"
                }}
                onMouseEnter={(e) => e.target.style.color = "#764ba2"}
                onMouseLeave={(e) => e.target.style.color = "#667eea"}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "14px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontWeight: "600",
                fontSize: "16px",
                marginBottom: "24px",
                position: "relative",
                overflow: "hidden",
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>⏳</span>
                  <span>Signing in...</span>
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>🔓</span>
                  <span>Sign In</span>
                </span>
              )}
            </button>

            {/* Demo Credentials Hint */}
            <div style={{
              background: "#f0fdf4",
              padding: "12px",
              borderRadius: "12px",
              marginBottom: "20px",
              border: "1px solid #bbf7d0"
            }}>
              <p style={{
                fontSize: "12px",
                color: "#166534",
                textAlign: "center",
                margin: 0
              }}>
                💡 Demo: admin@example.com / password
              </p>
            </div>

            {/* Register Link */}
            <div style={{
              padding: "20px 0 0",
              borderTop: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="link-hover"
                  style={{
                    color: "#667eea",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#764ba2"}
                  onMouseLeave={(e) => e.target.style.color = "#667eea"}
                >
                  Create Account →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;