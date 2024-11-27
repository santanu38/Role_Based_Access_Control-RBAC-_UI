import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: JSON.parse(localStorage.getItem("roles")) || [
    { id: 1, name: "admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "editor", permissions: ["read", "write"] },
  ],
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (state, action) => {
      const newRole = { id: Date.now(), ...action.payload };
      state.roles.push(newRole);
      // Save to localStorage
      localStorage.setItem("roles", JSON.stringify(state.roles));
    },
    updateRole: (state, action) => {
      const { id, name, permissions } = action.payload;
      const existingRole = state.roles.find((role) => role.id === id);
      if (existingRole) {
        existingRole.name = name;
        existingRole.permissions = permissions;
        // Save to localStorage
        localStorage.setItem("roles", JSON.stringify(state.roles));
      }
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload);
      // Save to localStorage
      localStorage.setItem("roles", JSON.stringify(state.roles));
    },
  },
});

export const { addRole, updateRole, deleteRole } = roleSlice.actions;

export default roleSlice.reducer;

