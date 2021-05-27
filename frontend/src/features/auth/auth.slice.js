import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  role: '',
  photo: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
        photo: ''
      };
    },
    removeUser: () => initialState
  }
});

const {setUser, removeUser} = authSlice.actions;

const authReducer = authSlice.reducer;

const selectUsername = (state) => state.auth.username;
const selectEmail = (state) => state.auth.email;
const selectRole = (state) => state.auth.role;
const selectPhoto = (state) => state.auth.photo;

export {
  setUser,
  removeUser,
  authReducer,
  selectUsername,
  selectEmail,
  selectRole,
  selectPhoto
};