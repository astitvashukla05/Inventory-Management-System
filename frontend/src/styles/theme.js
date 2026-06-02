export const theme = {
  colors: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    primaryLight: "#60a5fa",
    danger: "#ef4444",
    dangerDark: "#dc2626",
    success: "#10b981",
    successDark: "#059669",
    warning: "#f59e0b",
    warningDark: "#d97706",
    info: "#8b5cf6",
    infoDark: "#7c3aed",
    
    sidebar: "#0f172a",
    sidebarLight: "#1e293b",
    navbar: "#ffffff",
    
    background: "#f8fafc",
    backgroundDark: "#f1f5f9",
    card: "#ffffff",
    
    text: "#0f172a",
    textSecondary: "#475569",
    textLight: "#64748b",
    textMuted: "#94a3b8",
    
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    borderDark: "#cbd5e1",
  },
  
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    sm: "0 1px 3px rgba(0,0,0,0.1)",
    md: "0 4px 6px -1px rgba(0,0,0,0.1)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.1)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px -12px rgba(0,0,0,0.25)",
  },
  
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "18px",
    "2xl": "24px",
    full: "999px",
  },
  
  transitions: {
    fast: "all 0.15s ease",
    base: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 0.5s ease",
  },
  
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

export const pageContainer = {
  flex: 1,
  padding: "30px",
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
};

export const card = {
  background: theme.colors.card,
  borderRadius: theme.radius.lg,
  boxShadow: theme.shadows.sm,
  padding: "24px",
  border: `1px solid ${theme.colors.border}`,
  transition: theme.transitions.base,
};

export const input = {
  width: "100%",
  padding: "12px 16px",
  border: `1.5px solid ${theme.colors.border}`,
  borderRadius: theme.radius.md,
  outline: "none",
  boxSizing: "border-box",
  fontSize: "14px",
  transition: theme.transitions.fast,
  background: theme.colors.card,
};

export const buttonPrimary = {
  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: theme.radius.md,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: theme.transitions.base,
};

export const buttonDanger = {
  background: `linear-gradient(135deg, ${theme.colors.danger} 0%, ${theme.colors.dangerDark} 100%)`,
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: theme.radius.md,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: theme.transitions.base,
};

export const buttonSecondary = {
  background: theme.colors.textLight,
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: theme.radius.md,
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: theme.transitions.base,
};

export const tableContainer = {
  background: theme.colors.card,
  borderRadius: theme.radius.lg,
  overflow: "hidden",
  boxShadow: theme.shadows.sm,
  border: `1px solid ${theme.colors.border}`,
};

export const tableHeader = {
  background: theme.colors.borderLight,
  fontWeight: "600",
  color: theme.colors.textSecondary,
};