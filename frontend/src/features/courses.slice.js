import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  list: [],
  show: {},
  categories: []
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => ({
      list: action.payload,
      show: state.show,
      categories: state.categories
    }),
    setCourse: (state, action) => ({
      list: state.list,
      show: action.payload,
      categories: state.categories
    }),
    setCategories: (state, action) => ({
      list: state.list,
      show: state.show,
      categories: action.payload
    })
  }
});

const {setCourses, setCourse, setCategories} = coursesSlice.actions;

const coursesReducer = coursesSlice.reducer;

const selectCourses = (state) => state.courses.list;
const selectCourse = (state) => state.courses.show;
const selectCategories = (state) => state.courses.categories;

export {
  setCourses,
  setCourse,
  setCategories,
  coursesReducer,
  selectCourses,
  selectCourse,
  selectCategories
};