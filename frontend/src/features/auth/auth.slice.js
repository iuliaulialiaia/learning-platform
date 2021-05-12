import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  photo: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(JSON.stringify(action));
      return {
        username: action.payload.username,
        email: action.payload.email,
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

export {
  setUser,
  removeUser,
  authReducer,
  selectUsername,
  selectEmail
};