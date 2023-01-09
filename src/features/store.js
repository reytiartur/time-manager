import currentUserReducer from './userSlice';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const userReducer = persistReducer(persistConfig, currentUserReducer)

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [thunk]
})

export const persistor = persistStore(store)