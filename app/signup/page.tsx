"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import AuthBackground from "../../src/components/auth/AuthBackground";

const styles: Record<string, CSSProperties> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "auto",
    background: "#f5f7f6",
    color: "#17201c",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.76)",
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
    padding: "32px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    boxSizing: "border-box",
    padding: "32px 36px",
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
    marginBottom: "26px",
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

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  label: {
    color: "#26332d",
    fontSize: "13px",
    fontWeight: 600,
  },

  input: {
    width: "100%",
    height: "44px",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "1px solid #d9e1dd",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#17201c",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    height: "46px",
    marginTop: "3px",
    border: "none",
    borderRadius: "9px",
    background: "#176b4d",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  footer: {
    marginTop: "20px",
    paddingTop: "17px",
    borderTop: "1px solid #e7ebe9",
    textAlign: "center",
    color: "#68736e",
    fontSize: "13px",
  },

  link: {
    color: "#176b4d",
    fontWeight: 700,
    textDecoration: "none",
  },
};

export default function SignupPage() {
  const [focused, setFocused] = useState<string | null>(null);

  const getInputStyle = (name: string): CSSProperties => ({
    ...styles.input,
    borderColor: focused === name ? "#176b4d" : "#d9e1dd",
    boxShadow:
      focused === name
        ? "0 0 0 3px rgba(23, 107, 77, 0.10)"
        : "none",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main style={styles.page}>
      <AuthBackground />

      <div style={styles.overlay} />

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
            <p style={styles.eyebrow}>Campus Canteen</p>

            <h1 style={styles.title}>
              Create your account
            </h1>

            <p style={styles.description}>
              Join the campus canteen and make ordering your food
              faster and easier.
            </p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >
            <div style={styles.field}>
              <label htmlFor="name" style={styles.label}>
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                style={getInputStyle("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="studentId" style={styles.label}>
                Student ID / SIN
              </label>

              <input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="Enter your student ID"
                autoComplete="username"
                style={getInputStyle("studentId")}
                onFocus={() => setFocused("studentId")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>
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
              <label htmlFor="password" style={styles.label}>
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                style={getInputStyle("password")}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="confirmPassword" style={styles.label}>
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                style={getInputStyle("confirmPassword")}
                onFocus={() => setFocused("confirmPassword")}
                onBlur={() => setFocused(null)}
              />
            </div>

            <button type="submit" style={styles.button}>
              Create account
            </button>
          </form>

          {/* Footer */}
          <div style={styles.footer}>
            Already have an account?{" "}
            <Link href="/login" style={styles.link}>
              Sign in
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}