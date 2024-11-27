
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../features/userSlice";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";

const UserTable = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(null);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // For tracking the user to be deleted
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // For showing confirmation dialog

  // Open confirmation dialog
  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setIsDeleteConfirmationOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
    }
    setIsDeleteConfirmationOpen(false);
    setDeleteUserId(null); // Reset the user ID after deletion
  };

  // Cancel delete action
  const handleDeleteCancel = () => {
    setIsDeleteConfirmationOpen(false);
    setDeleteUserId(null);
  };

  return (
    <div className="bg-slate-500 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setAddUserModalOpen(true)}
      >
        Add User
      </button>
      <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-md">
        <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.status}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(user.id)} // Trigger delete confirmation
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <EditUserModal user={editUser} onClose={() => setEditUser(null)} />
      )}
      {isAddUserModalOpen && (
        <AddUserModal onClose={() => setAddUserModalOpen(false)} />
      )}

      {/* Confirmation Modal */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete this user?</h3>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleDeleteConfirm} // Confirm delete
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={handleDeleteCancel} // Cancel delete
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

export default UserTable;

