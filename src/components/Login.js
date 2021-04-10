import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center mb-4">Log In</h2>
        {error && <alert variant="danger">{error}</alert>}
        <form className="form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" ref={emailRef} required />
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
          <button disabled={loading} className="w-100" type="submit">
            Log In
          </button>
        </form>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
