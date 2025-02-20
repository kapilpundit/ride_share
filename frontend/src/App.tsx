import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginRegister from './components/LoginRegister';  // Import the LoginRegister component
import Layout from "./components/layouts/Layout";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginRegister />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
