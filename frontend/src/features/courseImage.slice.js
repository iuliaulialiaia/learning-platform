import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  image: []
};

const courseImageSlice = createSlice({
  name: 'courseImage',
  initialState,
  reducers: {
    setImage: (state, action) => ({
      image: action.payload
    })
  }
});

const {setImage} = courseImageSlice.actions;

const courseImageReducer = courseImageSlice.reducer;

const selectImage = (state) => state.courseImage.image;

export {
  setImage,
  courseImageReducer,
  selectImage
};