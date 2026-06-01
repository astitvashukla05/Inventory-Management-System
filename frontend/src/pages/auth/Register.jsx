import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Check password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "#ef4444";
    if (passwordStrength <= 3) return "#f59e0b";
    if (passwordStrength <= 4) return "#3b82f6";
    return "#10b981";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
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
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        .register-container {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .register-card {
          animation: slideInLeft 0.5s ease-out;
          transition: all 0.3s ease;
        }
        
        .register-card:hover {
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
        
        .strength-bar {
          transition: all 0.3s ease;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
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
        {/* Decorative elements */}
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
        <div className="decorative-circle" style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: "pulse 4s infinite"
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

        <div className="register-card" style={{
          width: "460px",
          background: "white",
          padding: "48px",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
          zIndex: 1
        }}>
          {/* Logo/Brand */}
          <div style={{
            textAlign: "center",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "32px"
            }}>
              🚀
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
              Create Account
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="input-wrapper" style={{ position: "relative", marginBottom: "20px" }}>
              <span className="input-icon" style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                fontSize: "18px"
              }}>
                👤
              </span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
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
            <div className="input-wrapper" style={{ position: "relative", marginBottom: "12px" }}>
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px"
                }}>
                  <div style={{ display: "flex", gap: "4px", flex: 1 }}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="strength-bar"
                        style={{
                          flex: 1,
                          height: "4px",
                          background: level <= passwordStrength ? getPasswordStrengthColor() : "#e2e8f0",
                          borderRadius: "2px",
                          transition: "all 0.3s ease"
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: getPasswordStrengthColor(),
                    marginLeft: "8px"
                  }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <p style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: "4px"
                }}>
                  Use 6+ chars with letters, numbers & symbols
                </p>
              </div>
            )}

            {/* Register Button */}
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
                marginTop: "8px",
                marginBottom: "20px",
                position: "relative",
                overflow: "hidden",
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>⏳</span>
                  <span>Creating account...</span>
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>🚀</span>
                  <span>Register</span>
                </span>
              )}
            </button>

            {/* Terms and Conditions */}
            <p style={{
              fontSize: "12px",
              color: "#64748b",
              textAlign: "center",
              marginBottom: "20px",
              lineHeight: "1.5"
            }}>
              By registering, you agree to our{" "}
              <a href="#" style={{ color: "#667eea", textDecoration: "none" }}>Terms of Service</a>{" "}
              and{" "}
              <a href="#" style={{ color: "#667eea", textDecoration: "none" }}>Privacy Policy</a>
            </p>

            {/* Login Link */}
            <div style={{
              padding: "20px 0 0",
              borderTop: "1px solid #e2e8f0",
              textAlign: "center"
            }}>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
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
                  Sign In →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;