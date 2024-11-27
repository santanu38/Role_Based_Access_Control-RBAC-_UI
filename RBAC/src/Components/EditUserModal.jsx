// src/components/EditUserModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/userSlice";

const EditUserModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    status: user.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user.id, ...formData }));
    onClose(); // Close the modal after updating
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Role:
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Status:
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 w-full"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
