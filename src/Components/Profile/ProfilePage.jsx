import React from "react";
import "./ProfilePage.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = {
    name: "Sristy",
    phone: "+91 8252613100",
    avatar: "",
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate("/"); // Redirect to landing page
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <div className="profile-page-root">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" />
          ) : (
            <span className="profile-avatar-placeholder">👤</span>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-name">{user.name}</div>
          <div className="profile-phone">{user.phone}</div>
        </div>
      </div>

      <div className="profile-section">
        <ul className="profile-list">
          <li>
            <span role="img" aria-label="address">📍</span> Addresses
          </li>
          <li>
            <span role="img" aria-label="support">💬</span> Customer Support
          </li>
          <li>
            <span role="img" aria-label="settings">⚙️</span> Profile Settings
          </li>
        </ul>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
}