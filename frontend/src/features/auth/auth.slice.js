import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  username: '',
  email: '',
  confirmed: false,
  uploadedPic: false,
  title: '',
  description: '',
  contact: '',
  work: '',
  education: '',
  award: '',
  book: '',
  token: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        loggedIn: true,
        ...action.payload
      };
    },
    removeUser: () => initialState
  }
});

const {setUser, removeUser} = authSlice.actions;

const authReducer = authSlice.reducer;

const selectLoggedIn = (state) => state.auth.loggedIn;
const selectUsername = (state) => state.auth.username;
const selectEmail = (state) => state.auth.email;
const selectConfirmed = (state) => state.auth.confirmed;
const selectUploadedPic = (state) => state.auth.uploadedPic;
const selectTitle = (state) => state.auth.title;
const selectDescription = (state) => state.auth.description;
const selectContact = (state) => state.auth.contact;
const selectWork = (state) => state.auth.work;
const selectEducation = (state) => state.auth.education;
const selectAward = (state) => state.auth.award;
const selectBook = (state) => state.auth.book;
const selectToken = (state) => state.auth.token;

export {
  setUser,
  removeUser,
  authReducer,
  selectLoggedIn,
  selectUsername,
  selectEmail,
  selectConfirmed,
  selectUploadedPic,
  selectTitle,
  selectDescription,
  selectContact,
  selectWork,
  selectEducation,
  selectAward,
  selectBook,
  selectToken
};