import currentUserReducer from './userSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import projectsReducer from './projectsSlice';
import filtersReducer from './filtersSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filters'],
}

const rootReducer = combineReducers({
  user: currentUserReducer,
  projects: projectsReducer,
  filters: filtersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)