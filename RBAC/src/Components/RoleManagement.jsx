import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRole, updateRole, deleteRole } from "../features/roleSlice";

const RoleManagement = () => {
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();

  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [isAddRoleMode, setIsAddRoleMode] = useState(false);

  // State for duplicate error
  const [duplicateError, setDuplicateError] = useState("");

  // State for confirmation dialog
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Save function
  const handleSave = () => {
    const roleName = editingRole ? editingRole.name : newRole.name.trim();

    // Check for duplicate role name
    const isDuplicate = roles.some(
      (role) =>
        role.name.toLowerCase() === roleName.toLowerCase() &&
        role.id !== (editingRole?.id || null)
    );

    if (isDuplicate) {
      setDuplicateError("Role name already exists. Please choose a different name.");
      return;
    }

    if (editingRole?.id) {
      dispatch(updateRole(editingRole));
    } else {
      const rolePayload = { id: Date.now(), ...newRole };
      dispatch(addRole(rolePayload));
    }

    // Reset states after saving
    handleCancel(); // Use handleCancel to reset
  };

  // Cancel function
  const handleCancel = () => {
    setEditingRole(null);
    setNewRole({ name: "", permissions: [] });
    setIsAddRoleMode(false);
    setDuplicateError(""); // Clear error if any
  };

  // Handle Add Role click
  const handleAddRoleClick = () => {
    setEditingRole(null);
    setNewRole({ name: "", permissions: [] });
    setIsAddRoleMode(true);
    setDuplicateError(""); // Clear error when switching to add mode
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    if (field === "name") {
      const value = e.target.value;
      if (editingRole) {
        setEditingRole({
          ...editingRole,
          name: value,
        });
      } else {
        setNewRole({
          ...newRole,
          name: value,
        });
      }
      setDuplicateError(""); // Clear error on input change
    } else if (field === "permissions") {
      const permissionsArray = e.target.value
        .split(",")
        .map((perm) => perm.trim());
      if (editingRole) {
        setEditingRole({
          ...editingRole,
          permissions: permissionsArray,
        });
      } else {
        setNewRole({
          ...newRole,
          permissions: permissionsArray,
        });
      }
    }
  };

  // Confirm Delete function
  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setIsConfirmDelete(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    dispatch(deleteRole(roleToDelete.id));
    setIsConfirmDelete(false);
    setRoleToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setIsConfirmDelete(false);
    setRoleToDelete(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Role Management</h2>

      {/* Add Role Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 mb-4"
        onClick={handleAddRoleClick}
      >
        Add Role
      </button>

      {/* Role Table */}
      <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-md">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Permissions</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {role.permissions.join(", ")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="mr-2 text-blue-500"
                    onClick={() => {
                      setEditingRole(role);
                      setIsAddRoleMode(false);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteClick(role)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Role Form */}
      {(isAddRoleMode || editingRole) && (
        <div className="mt-4">
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Role Name"
            value={editingRole?.name || newRole.name}
            onChange={(e) => handleInputChange(e, "name")}
          />
          {duplicateError && (
            <p className="text-red-500 text-sm mt-1">{duplicateError}</p>
          )}
          <input
            className="border p-2 mr-2"
            type="text"
            placeholder="Permissions (comma-separated)"
            value={editingRole?.permissions?.join(", ") || newRole.permissions.join(", ")}
            onChange={(e) => handleInputChange(e, "permissions")}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete the role: {roleToDelete?.name}?</p>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 mr-2"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;








