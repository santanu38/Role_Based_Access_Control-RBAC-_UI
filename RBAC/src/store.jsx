import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import roleReducer from './features/roleSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    roles: roleReducer,
  },
});

export default store;
