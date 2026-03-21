import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LoginForm.css";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required");
    if (!email.includes("@")) return setError("Invalid email address");
    if (!password) return setError("Password is required");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      if (res.data?.token) {
        onLogin(res.data.token);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.status === 401 ? "Invalid email or password" : "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lf-root">
      <div className="lf-orb lf-orb-1" />
      <div className="lf-orb lf-orb-2" />
      <div className="lf-orb lf-orb-3" />

      <div className="lf-card">
        <span className="lf-corner lf-corner-tl" />
        <span className="lf-corner lf-corner-tr" />
        <span className="lf-corner lf-corner-bl" />
        <span className="lf-corner lf-corner-br" />

        <p className="lf-eyebrow">Secure Access</p>
        <h1 className="lf-title">Wel<em>come</em></h1>
        <p className="lf-subtitle">Sign in to your account to continue</p>

        {error && (
          <div className="lf-error">
            <span className="lf-error-dot" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="lf-field">
            <input
              className="lf-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              autoComplete="email"
              disabled={loading}
            />
            <label className="lf-label" htmlFor="email">Email</label>
          </div>

          <div className="lf-field">
            <input
              className="lf-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoComplete="current-password"
              disabled={loading}
            />
            <label className="lf-label" htmlFor="password">Password</label>
          </div>

          <div className="lf-divider" />

          <button className="lf-button" type="submit" disabled={loading}>
            {loading && <span className="lf-spinner" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="lf-footer">
      
        </p>
      </div>
    </div>
  );
}