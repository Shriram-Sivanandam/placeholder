import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Register.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="bottom">Profile</h2>
        {error && <alert variant="danger">{error}</alert>}
        <h4>Email:</h4> {currentUser.email}
        <br></br>
        <button className="bttn">
          <Link to="/update-profile" className="updateLink">
            Update Profile
          </Link>
        </button>
      </div>
      <div className="w-100 text-center mt-2">
        <button className="bttn right" variant="link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </>
  );
}
