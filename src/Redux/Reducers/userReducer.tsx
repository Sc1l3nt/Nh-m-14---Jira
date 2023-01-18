import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../Utils/config";
import { history } from "../../index";
import { DispatchType } from "../configStore";

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface UserRegisterModel {
  email: string;
  password: string;
  name: string;
  phoneNumber: string | null;
}

const initialState = {
  userLogin: null,
  userProfile: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    registerAction: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { loginAction, registerAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signin", userLogin);
    console.log(result.data.content);
    const action = loginAction(result.data.content);
    dispatch(action);
    history.push("/");
  };
};

export const registerApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: DispatchType) => {
    const result = await http.post("/Users/signup", userRegister);
    console.log(result.data.content);
    // const action = registerAction(result.data.content);
    // dispatch(action);
    // history.push("/login");
  };
};
