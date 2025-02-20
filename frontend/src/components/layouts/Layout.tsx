import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import profilePic from "../../assets/profile.png"; // Default user profile image

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Remove tokens from storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect to Login Page
    navigate("/");
  };

  return (
    <div className="layout">
      {/* Left Sidebar */}
      <nav className="sidebar">
        <h2>RideShare</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="topbar">
          <h2>Welcome to Ride Share</h2>

          {/* Profile Dropdown */}
          <div className="profile-container">
            <img
              src={profilePic}
              alt="User"
              className="profile-pic"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="content">
          <Outlet /> {/* This will render child pages like Dashboard, Profile, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
