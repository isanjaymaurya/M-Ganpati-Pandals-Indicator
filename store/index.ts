import { configureStore } from '@reduxjs/toolkit';
import visitedPandalsReducer from './appSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IVisitedPandalsState } from '@/types/global';

const persistConfig = {
  key: 'visitedPandals',
  storage,
};

const persistedReducer = persistReducer<IVisitedPandalsState>(persistConfig, visitedPandalsReducer);

export const store = configureStore({
  reducer: {
    visitedPandals: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = {
  visitedPandals: IVisitedPandalsState;
};
export type AppDispatch = typeof store.dispatch;
