import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";

function App() {
  console.log("Backend URL:", import.meta.env.VITE_API_URL);

  return (
    <div>
      <h1>Retail Inventory Analytics</h1>

      {/* Simple Nav Bar */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/inventory">Inventory</Link> |{" "}
        <Link to="/analytics">Analytics</Link> |{" "}
        <Link to="/alerts">Alerts</Link>
      </nav>

      {/* Route Setup */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </div>
  );
}

export default App;