import React, { useState } from "react";
import api from "../api";

export default function Login({ onLoginSuccess, onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // call backend via axios instance
      const res = await api.post("/auth/login", form);
      const data = res.data;

      // save auth info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");

      // notify App if it passed a callback
      if (onLoginSuccess) onLoginSuccess(data.user, data.token);
      else if (onLogin) onLogin(data.user);

      // go home
      window.location.href = "/";
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed";
      setMessage(msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 320,
          padding: 32,
          borderRadius: 8,
          background: "rgba(24,24,40,0.98)",
          boxShadow: "0 4px 24px #0006",
          color: "#fff",
          marginTop: 32,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#b37cfc",
          }}
        >
          Sign In
        </h2>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            border: "none",
          }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 16,
            borderRadius: 5,
            border: "none",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            background: "#8e44ec",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
        <div
          style={{
            color: "#f77",
            marginTop: 14,
            minHeight: 22,
            textAlign: "center",
          }}
        >
          {message}
        </div>
      </form>
    </div>
  );
}
