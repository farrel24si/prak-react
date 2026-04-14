import React from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import "./tailwind.css";

// Pastikan kodingan render ini ada!
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="flex min-h-screen bg-gray-50 font-barlow">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <Dashboard />
      </div>
    </div>
  </React.StrictMode>
);