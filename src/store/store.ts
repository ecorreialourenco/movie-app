import { configureStore } from "@reduxjs/toolkit";
import credentialsStore from "./slices/credentialsStore";
import movieStore from "./slices/movieStore";

export const store = configureStore({
  reducer: {
    credentials: credentialsStore,
    movie: movieStore,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
