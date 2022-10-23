import { applyMiddleware, createStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//
import rootReducer from './feactures';


const persistConfig = {
    key: 'AdbTauri',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch