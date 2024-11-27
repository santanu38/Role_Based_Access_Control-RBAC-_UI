
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import RoleManagementp from "./pages/RoleManagement";
import PermissionsMatrixp from "./pages/PermissionsMatrix";
import "./App.css"; // For basic styling

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <nav className="bg-gray-800 text-white w-64 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-red-500">RBAC Dashboard</h2>
          <ul className="space-y-4">
            <li >
              <Link to="/user-management" className="block px-4 py-2 rounded hover:bg-gray-700"
              >User Management</Link>
            </li>
            <li>
              <Link to="/role-management" className="block px-4 py-2 rounded hover:bg-gray-700">Role Management</Link>
            </li>
            <li>
              <Link to="/permissions-matrix" className="block px-4 py-2 rounded hover:bg-gray-700">Permissions Matrix</Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-200 p-6">
          <Routes>
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/role-management" element={<RoleManagementp />} />
            <Route path="/permissions-matrix" element={<PermissionsMatrixp />} />
            <Route path="/" element={<h1 className="text-3xl font-semibold">Welcome to RBAC Dashboard</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

