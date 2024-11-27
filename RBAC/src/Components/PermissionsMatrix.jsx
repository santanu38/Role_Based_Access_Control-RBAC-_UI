import React from "react";
import { useSelector } from "react-redux";



const UserPermissionsMatrix = () => {
  const users = useSelector((state) => state.users.users);  // Fetch users from Redux
  const roles = useSelector((state) => state.roles.roles); ; // Fetch roles and permissions from Redux
  console.log(roles);
  return (
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">User-Based Permissions Matrix</h1>
      <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-md">
          <table className="table-auto border-collapse border border-gray-400 w-full bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Role</th>
                <th className="border border-gray-400 px-4 py-2">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                // Find the role from the roles array
                const role = roles.find((r) => r.name === user.role);

                return (
                  <tr key={user.id}>
                    <td className="border border-gray-400 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-400 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {role ? role.permissions.join(", ") : "No Permissions Assigned"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default UserPermissionsMatrix;
