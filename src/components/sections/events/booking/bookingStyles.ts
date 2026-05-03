import type { CSSProperties } from "react";

export const BASE: CSSProperties = {
  width: "100%",
  background: "#272727",
  border: "1px solid rgba(227,172,119,0.2)",
  color: "white",
  fontSize: "14px",
  padding: "14px 16px",
  outline: "none",
  fontFamily: "var(--font-google-sans-flex), sans-serif",
  borderRadius: "0",
  boxSizing: "border-box",
};

export const LOCKED: CSSProperties = {
  ...BASE,
  color: "#e3ac77",
  border: "1px solid rgba(227,172,119,0.5)",
  cursor: "not-allowed",
  background: "#1a1a1a",
};

export const SELECT: CSSProperties = {
  ...BASE,
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23e3ac77' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  backgroundSize: "14px",
  paddingRight: "40px",
  cursor: "pointer",
};
