import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categories: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => ({
      categories: action.payload
    }),
    setNames: (state, action) => ({
      categories: action.payload.map(name => ({
        name: name,
        checked: false
      }))
    }),
    clearCategories: state => ({
      categories: state.categories.map(category => ({
        name: category.name,
        checked: false
      }))
    })
  }
});

const {setCategories, setNames, clearCategories} = categorySlice.actions;

const categoryReducer = categorySlice.reducer;

const selectCategories = (state) => state.category.categories;

export {
  setCategories,
  setNames,
  clearCategories,
  categoryReducer,
  selectCategories
};