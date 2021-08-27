import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {authReducer} from '../features/auth.slice';
import {coursesReducer} from '../features/courses.slice';
import {categoryReducer} from '../features/category.slice';
import {courseImageReducer} from "../features/courseImage.slice";

const persistConfig = {
  key: 'auth',
  storage
}

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    courses: coursesReducer,
    category: categoryReducer,
    courseImage: courseImageReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
const persistor = persistStore(store);

export {store, persistor};