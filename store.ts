import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./src/features/Authentication/slices/authenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
