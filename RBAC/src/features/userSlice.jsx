import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    users: [
      { id: 1, name: "John", role: "admin", status: "active" },
      { id: 2, name: "Rabeka", role: "editor", status: "inactive" },
      { id: 3, name: "Santanu Jana", role: "admin", status: "active" },
    ],
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => { 
       state.users.push(action.payload)
    },
    deleteUser: (state, action) => { 
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const {id,name,role,status}=action.payload
      const user=state.users.find((user)=>user.id===id)
      if(user){
          user.name=name
          user.id=id
          user.role=role
          user.status=status
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
