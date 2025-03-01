import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import profilePic from "../../../public/profile_pics/alex-suprun.jpg"; // Default user profile image

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
    <div className="layout fixed inset-0 flex">
      {/* Left Sidebar */}
      <nav className="sidebar w-64 bg-gray-800 text-white flex flex-col p-4 h-full">
        <h2 className="text-center text-lg font-semibold">Ride Share</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-3 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/my-rides"
              className="block p-3 rounded hover:bg-gray-700"
            >
              My Rides
            </Link>
          </li>
          <li>
            <Link
              to="/find-ride"
              className="block p-3 rounded hover:bg-gray-700"
            >
              Find a Ride
            </Link>
          </li>
          <li>
            <Link
              to="/offer-ride"
              className="block p-3 rounded hover:bg-gray-700"
            >
              Offer a Ride
            </Link>
          </li>
          <li>
            <Link
              to="/payments"
              className="block p-3 rounded hover:bg-gray-700"
            >
              Payments & Wallet
            </Link>
          </li>
          <li>
            <Link to="/reviews" className="block p-3 rounded hover:bg-gray-700">
              Reviews & Ratings
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block p-3 rounded hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content flex-grow flex flex-col w-full">
        {/* Top Navbar */}
        <header className="topbar flex justify-between items-center bg-gray-100 p-4 w-full">
          <h2 className="text-lg font-semibold">Welcome to Ride Share</h2>

          {/* Profile Dropdown */}
          <div className="profile-container relative pr-4">
            <img
              src={profilePic}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown-menu absolute top-12 right-0 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="content p-6 flex-grow">
          <Outlet />{" "}
          {/* This will render child pages like Dashboard, Profile, etc. */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
