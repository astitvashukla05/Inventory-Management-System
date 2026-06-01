import { theme } from "./theme";

export const pageContainer = {
  flex: 1,
  padding: "30px",
};

export const card = {
  background: theme.colors.card,
  borderRadius: theme.radius,
  boxShadow: theme.shadow,
  padding: "24px",
};

export const input = {
  width: "100%",
  padding: "12px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  outline: "none",
  boxSizing: "border-box",
};

export const buttonPrimary = {
  background: theme.colors.primary,
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

export const buttonDanger = {
  background: theme.colors.danger,
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

export const buttonSecondary = {
  background: "#64748b",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
};

export const tableContainer = {
  background: "white",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: theme.shadow,
};

export const tableHeader = {
  background: "#f8fafc",
};