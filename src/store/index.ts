import { configureStore } from "@reduxjs/toolkit";
import room from "./features/room";
import currentId from "./features/currentId";
import user from "./features/user";
import cells from "./features/cells";
import turn from "./features/turn";

export const store = configureStore({
  reducer: {
    room,
    currentId,
    user,
    cells,
    turn,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
