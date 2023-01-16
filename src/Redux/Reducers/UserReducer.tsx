import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLogin: null,
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {},
});

export const {} = UserReducer.actions;

export default UserReducer.reducer;
