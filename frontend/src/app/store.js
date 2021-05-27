import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import {authReducer} from '../features/auth/auth.slice';

const persistConfig = {
  key: 'auth',
  storage
}

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer)
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
const persistor = persistStore(store);

export {store, persistor};