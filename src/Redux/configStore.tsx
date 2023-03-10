import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./Reducers/commentReducer";
import projectReducer from "./Reducers/projectReducer";
import taskReducer from "./Reducers/taskReducer";
import userReducer from "./Reducers/userReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    projectReducer: projectReducer,
    taskReducer: taskReducer,
    commentReducer: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
