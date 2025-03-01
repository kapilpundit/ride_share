import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginRegister from "./components/LoginRegister"; // Import the LoginRegister component
import Layout from "./components/layouts/Layout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/Settings";
import NotFound from "./components/pages/NotFound"; // Import the 404 page

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginRegister />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 404 Not Found - This should always be the last route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
