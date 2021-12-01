import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import { postsSlice } from "./posts/posts.slice";
import { photosSlice } from "./photos/photos.slice";

const reducers = combineReducers({
    reducer1: postsSlice.reducer,
    reducer2: photosSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

type RootState = ReturnType<typeof store.getState>;

export const selectPosts = (state: RootState) => state.reducer1;

export const selectPhotos = (state: RootState) => state.reducer2;

export default store;