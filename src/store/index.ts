import { configureStore } from "@reduxjs/toolkit";
import room from "./features/room";
import currentRoom from "./features/currentRoom";
import currentId from "./features/currentId";
import user from "./features/user";

export const store = configureStore({
  reducer: {
    room,
    currentRoom,
    currentId,
    user,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
