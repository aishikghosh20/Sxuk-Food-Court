"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
    background: "#f5f7f6",
    color: "#17201c",
  },

  backgroundCircle1: {
    position: "absolute",
    width: "430px",
    height: "430px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.065)",
    top: "-190px",
    left: "-110px",
    pointerEvents: "none",
  },

  backgroundCircle2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.045)",
    top: "80px",
    right: "14%",
    pointerEvents: "none",
  },

  backgroundCircle3: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(23, 107, 77, 0.05)",
    right: "-230px",
    bottom: "-260px",
    pointerEvents: "none",
  },

  line: {
    position: "absolute",
    width: "140%",
    height: "1px",
    left: "-20%",
    background: "rgba(23, 107, 77, 0.06)",
    transform: "rotate(-16deg)",
    top: "42%",
    pointerEvents: "none",
  },

  content: {
    position: "relative",
    zIndex: 2,
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: "28px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    boxSizing: "border-box",
    padding: "38px 36px",
    background: "rgba(255, 255, 255, 0.98)",
    border: "1px solid rgba(23, 107, 77, 0.12)",
    borderRadius: "20px",
    boxShadow: "0 18px 50px rgba(23, 43, 34, 0.12)",
  },

  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "16px",
  },

  logo: {
    width: "54px",
    height: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "15px",
    background: "#176b4d",
  },

  logoText: {
    fontSize: "23px",
    lineHeight: 1,
    filter: "grayscale(1) brightness(0) invert(1)",
  },

  header: {
    textAlign: "center",
    marginBottom: "28px",
  },

  eyebrow: {
    margin: "0 0 7px",
    color: "#176b4d",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
    color: "#17201c",
    fontSize: "30px",
    lineHeight: 1.2,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },

  description: {
    maxWidth: "360px",
    margin: "10px auto 0",
    color: "#68736e",
    fontSize: "14px",
    lineHeight: 1.55,
  },

  fields: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  label: {
    color: "#26332d",
    fontSize: "13px",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    height: "46px",
    boxSizing: "border-box",
    padding: "11px 13px",
    border: "1px solid #d9e1dd",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#17201c",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    height: "48px",
    marginTop: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "none",
    borderRadius: "10px",
    background: "#176b4d",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(23, 107, 77, 0.14)",
  },

  footer: {
    marginTop: "24px",
    paddingTop: "19px",
    borderTop: "1px solid #e7ebe9",
    textAlign: "center",
    color: "#68736e",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  link: {
    color: "#176b4d",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default function LoginPage() {
  const [focused, setFocused] = useState<string | null>(null);

  const getInputStyle = (name: string): CSSProperties => ({
    ...styles.input,
    borderColor: focused === name ? "#176b4d" : "#d9e1dd",
    boxShadow:
      focused === name
        ? "0 0 0 3px rgba(23, 107, 77, 0.10)"
        : "none",
  });

  return (
    <main style={styles.page}>

      {/* Static background */}
      <div style={styles.backgroundCircle1} />
      <div style={styles.backgroundCircle2} />
      <div style={styles.backgroundCircle3} />
      <div style={styles.line} />

      {/* Login card */}
      <section style={styles.content}>
        <div style={styles.card}>

          {/* Logo */}
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              <span style={styles.logoText}>🍴</span>
            </div>
          </div>

          {/* Header */}
          <header style={styles.header}>
            <p style={styles.eyebrow}>
              Campus Canteen
            </p>

            <h1 style={styles.title}>
              Welcome back
            </h1>

            <p style={styles.description}>
              Sign in to order from your campus canteen and keep
              your orders in one place.
            </p>
          </header>

          {/* Login fields */}
          <div style={styles.fields}>

            <div style={styles.field}>
              <label
                htmlFor="email"
                style={styles.label}
              >
                University email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your university email"
                autoComplete="email"
                style={getInputStyle("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={styles.field}>
              <label
                htmlFor="password"
                style={styles.label}
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                style={getInputStyle("password")}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Temporary login navigation */}
            <a
              href="/api/demo-login"
              style={styles.button}
            >
              Sign in
            </a>

          </div>

          {/* Signup */}
          <div style={styles.footer}>
            New here?{" "}
            <Link
              href="/signup"
              style={styles.link}
            >
              Create an account
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}